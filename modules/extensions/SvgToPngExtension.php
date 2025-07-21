<?php
namespace modules;

use Craft;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use yii\helpers\FileHelper;

/**
 * Twig extension that provides SVG to PNG conversion for email compatibility
 */
class SvgToPngExtension extends AbstractExtension
{
    public function getFilters(): array
    {
        return [
            new TwigFilter('svgToPng', [$this, 'svgToPng']),
        ];
    }

    public function svgToPng($svgUrl, $width = 25, $height = 25): string
    {
        if (empty($svgUrl)) {
            return '';
        }

        // Validate and sanitize the SVG URL/path
        $svgPath = $this->validateAndSanitizePath($svgUrl);
        if (!$svgPath) {
            return $svgUrl; // Return original if validation fails
        }

        // Validate file exists and is actually an SVG
        if (!$this->isValidSvgFile($svgPath)) {
            return $svgUrl; // Return original if not valid SVG
        }

        // Validate dimensions
        [$calculatedWidth, $calculatedHeight] = $this->calculateDimensions($svgPath, $width, $height);
        if (!$this->isValidDimensions($calculatedWidth, $calculatedHeight)) {
            return $svgUrl; // Return original if dimensions are invalid
        }

        // Create secure cache directory
        $cacheDir = $this->createSecureCacheDirectory();
        if (!$cacheDir) {
            return $svgUrl; // Return original if cache directory creation fails
        }

        // Generate secure cache filename
        $filename = $this->generateSecureFilename($svgPath, $calculatedWidth, $calculatedHeight);
        $cacheFile = $cacheDir . $filename . '.png';
        $cacheUrl = '/assets/cache/svg-to-png/' . $filename . '.png';

        // Check if cached version exists and is newer than source
        if (file_exists($cacheFile) && filemtime($cacheFile) > filemtime($svgPath)) {
            return $cacheUrl;
        }

        // Convert SVG to PNG
        if ($this->convertSvgToPng($svgPath, $cacheFile, $calculatedWidth, $calculatedHeight)) {
            return $cacheUrl;
        }

        // Fallback to original SVG if conversion fails
        return $svgUrl;
    }

    private function validateAndSanitizePath($svgUrl): ?string
    {
        // Parse the URL safely
        $parsedUrl = parse_url($svgUrl);
        if (!$parsedUrl || !isset($parsedUrl['path'])) {
            return null;
        }

        $path = $parsedUrl['path'];
        
        // Remove any potential path traversal attempts
        $path = str_replace(['../', '..\\', './', '.\\'], '', $path);
        
        // Ensure path starts with / for security
        if (!str_starts_with($path, '/')) {
            return null;
        }

        // Build the full path
        $webroot = Craft::getAlias('@webroot');
        $fullPath = $webroot . $path;

        // Use realpath to resolve any remaining traversals and validate
        $realPath = realpath($fullPath);
        if (!$realPath) {
            return null;
        }

        // Ensure the resolved path is within the webroot
        $realWebroot = realpath($webroot);
        if (!str_starts_with($realPath, $realWebroot)) {
            return null;
        }

        // Only allow specific directories for SVG files
        $allowedDirectories = [
            '/assets/icons/',
            '/assets/images/',
            '/assets/cms/',
            '/uploads/',
            '/dist/icons/'
        ];

        $relativePath = str_replace($realWebroot, '', $realPath);
        $relativePath = str_replace('\\', '/', $relativePath); // Normalize for Windows

        $isAllowed = false;
        foreach ($allowedDirectories as $allowedDir) {
            if (str_starts_with($relativePath, $allowedDir)) {
                $isAllowed = true;
                break;
            }
        }

        if (!$isAllowed) {
            return null;
        }

        return $realPath;
    }

    private function isValidSvgFile($filePath): bool
    {
        // Check if file exists
        if (!file_exists($filePath)) {
            return false;
        }

        // Check file extension
        $extension = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
        if ($extension !== 'svg') {
            return false;
        }

        // Check file size (max 1MB for SVG)
        $maxFileSize = 1024 * 1024; // 1MB
        if (filesize($filePath) > $maxFileSize) {
            return false;
        }

        // Check if file actually contains SVG content
        $content = file_get_contents($filePath, false, null, 0, 1024); // Read first 1KB
        if (!$content) {
            return false;
        }

        // Basic SVG validation - must contain <svg tag
        if (!preg_match('/<svg[^>]*>/i', $content)) {
            return false;
        }

        // Check for potential malicious content
        $maliciousPatterns = [
            '/<script[^>]*>/i',
            '/javascript:/i',
            '/vbscript:/i',
            '/data:text\/html/i',
            '/<iframe[^>]*>/i',
            '/<object[^>]*>/i',
            '/<embed[^>]*>/i'
        ];

        foreach ($maliciousPatterns as $pattern) {
            if (preg_match($pattern, $content)) {
                return false;
            }
        }

        return true;
    }

    private function isValidDimensions($width, $height): bool
    {
        // Validate dimensions are positive integers within reasonable limits
        if (!is_numeric($width) || !is_numeric($height)) {
            return false;
        }

        $width = (int)$width;
        $height = (int)$height;

        // Check for reasonable size limits (max 2048x2048)
        if ($width < 1 || $height < 1 || $width > 2048 || $height > 2048) {
            return false;
        }

        return true;
    }

    private function createSecureCacheDirectory(): ?string
    {
        $cacheDir = Craft::getAlias('@webroot') . '/assets/cache/svg-to-png/';
        
        try {
            if (!file_exists($cacheDir)) {
                FileHelper::createDirectory($cacheDir, 0755); // Secure permissions
            }
            
            // Ensure directory is writable
            if (!is_writable($cacheDir)) {
                return null;
            }
            
            return $cacheDir;
        } catch (\Exception $e) {
            Craft::error('Failed to create cache directory: ' . $e->getMessage(), __METHOD__);
            return null;
        }
    }

    private function generateSecureFilename($svgPath, $width, $height): string
    {
        // Generate a secure filename using hash of the original path and dimensions
        $filename = pathinfo($svgPath, PATHINFO_FILENAME);
        $filename = preg_replace('/[^a-zA-Z0-9_-]/', '_', $filename); // Sanitize filename
        $hash = hash('sha256', $svgPath . $width . $height);
        return $filename . '_' . substr($hash, 0, 8) . "_{$width}x{$height}";
    }

    private function calculateDimensions($svgPath, $width, $height): array
    {
        // If both dimensions are specified and not 'auto', use them as-is
        if ($width !== 'auto' && $height !== 'auto') {
            return [(int)$width, (int)$height];
        }

        // Get SVG dimensions
        $svgDimensions = $this->getSvgDimensions($svgPath);
        $originalWidth = $svgDimensions['width'];
        $originalHeight = $svgDimensions['height'];

        // Calculate aspect ratio
        $aspectRatio = $originalWidth / $originalHeight;

        // Calculate dimensions based on what's auto
        if ($width === 'auto' && $height !== 'auto') {
            // Width is auto, height is specified
            $calculatedHeight = (int)$height;
            $calculatedWidth = (int)round($calculatedHeight * $aspectRatio);
        } elseif ($height === 'auto' && $width !== 'auto') {
            // Height is auto, width is specified
            $calculatedWidth = (int)$width;
            $calculatedHeight = (int)round($calculatedWidth / $aspectRatio);
        } else {
            // Both are auto - use original dimensions or fallback
            $calculatedWidth = $originalWidth ?: 25;
            $calculatedHeight = $originalHeight ?: 25;
        }

        return [$calculatedWidth, $calculatedHeight];
    }

    private function getSvgDimensions($svgPath): array
    {
        $defaultDimensions = ['width' => 25, 'height' => 25];
        
        if (!file_exists($svgPath)) {
            return $defaultDimensions;
        }

        $svgContent = file_get_contents($svgPath);
        if (!$svgContent) {
            return $defaultDimensions;
        }

        // Try to parse width and height from SVG
        $width = $height = null;
        
        // Match width attribute
        if (preg_match('/width\s*=\s*["\']?(\d+(?:\.\d+)?)["\']?/i', $svgContent, $matches)) {
            $width = (float)$matches[1];
        }
        
        // Match height attribute
        if (preg_match('/height\s*=\s*["\']?(\d+(?:\.\d+)?)["\']?/i', $svgContent, $matches)) {
            $height = (float)$matches[1];
        }
        
        // If we couldn't find width/height, try viewBox
        if (!$width || !$height) {
            if (preg_match('/viewBox\s*=\s*["\']?(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)["\']?/i', $svgContent, $matches)) {
                // viewBox="minX minY width height"
                $width = $width ?: (float)$matches[3];  // Use 3rd value (width)
                $height = $height ?: (float)$matches[4]; // Use 4th value (height)
            }
        }

        return [
            'width' => $width ?: $defaultDimensions['width'],
            'height' => $height ?: $defaultDimensions['height']
        ];
    }

    private function convertSvgToPng($svgPath, $pngPath, $width, $height): bool
    {
        // Method 1: Using ImageMagick (if available)
        if (extension_loaded('imagick')) {
            try {
                $imagick = new \Imagick();
                $imagick->setBackgroundColor(new \ImagickPixel('transparent'));
                $imagick->readImage($svgPath);
                $imagick->setImageFormat('png');
                $imagick->resizeImage($width, $height, \Imagick::FILTER_LANCZOS, 1);
                $imagick->writeImage($pngPath);
                $imagick->clear();
                return true;
            } catch (\Exception $e) {
                Craft::error('ImageMagick conversion failed: ' . $e->getMessage(), __METHOD__);
            }
        }

        // Additional conversion methods would go here (commented out for security)
        // Method 2: Using external command line tools would require additional security measures

        return false;
    }

    private function commandExists($command): bool
    {
        // Validate command name to prevent injection
        if (!is_string($command) || empty($command)) {
            return false;
        }

        // Only allow alphanumeric, dash, and underscore characters
        if (!preg_match('/^[a-zA-Z0-9_-]+$/', $command)) {
            return false;
        }

        // Whitelist of allowed commands
        $allowedCommands = ['inkscape', 'rsvg-convert', 'convert', 'magick'];
        if (!in_array($command, $allowedCommands)) {
            return false;
        }

        $whereIsCommand = (PHP_OS_FAMILY === 'Windows') ? 'where' : 'which';
        
        // Use escapeshellarg for the command parameter
        $safeCommand = escapeshellarg($command);
        
        $descriptorspec = [
            0 => ['pipe', 'r'],
            1 => ['pipe', 'w'],
            2 => ['pipe', 'w']
        ];
        
        $process = proc_open(
            "$whereIsCommand $safeCommand",
            $descriptorspec,
            $pipes,
            null,
            null,
            ['suppress_errors' => true]
        );
        
        if (is_resource($process)) {
            fclose($pipes[0]);
            $output = stream_get_contents($pipes[1]);
            fclose($pipes[1]);
            fclose($pipes[2]);
            $returnCode = proc_close($process);
            
            return $returnCode === 0 && !empty(trim($output));
        }
        
        return false;
    }
}