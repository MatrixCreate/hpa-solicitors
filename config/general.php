<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */

use craft\helpers\App;

$isDev = App::env('ENVIRONMENT') === 'dev';
$isProd = App::env('ENVIRONMENT') === 'production';

return [
    // Aliases used by Craft admin and can be used in Twig
    'aliases' => [
        '@assetsUrl' => App::env('ASSETS_URL') ?: App::env('PRIMARY_SITE_URL'),
        '@web' => App::env('PRIMARY_SITE_URL'),
        '@webroot' => App::env('WEB_ROOT_PATH'),
    ],

    // Default Week Start Day (0 = Sunday, 1 = Monday...)
    'defaultWeekStartDay' => 1,

    // Whether generated URLs should omit "index.php"
    'omitScriptNameInUrls' => true,

    // The URI segment that tells Craft to load the control panel
    'cpTrigger' => App::env('CP_TRIGGER') ?: 'admin',

    // The secure key Craft will use for hashing and encrypting data
    'securityKey' => App::env('SECURITY_KEY'),

    // Whether Dev Mode should be enabled (see https://craftcms.com/guides/what-dev-mode-does)
    'devMode' => $isDev,

    // Whether administrative changes should be allowed
    'allowAdminChanges' => $isDev,

    // Whether crawlers should be allowed to index pages and following links
    'disallowRobots' => !$isProd,

    // Prepend the error template path with the below e.g. '/errors' to go to /errors/404
    'errorTemplatePrefix' => 'errors/',

    // Disable Craft's default queue system. Use host Daemon instead
    'runQueueAutomatically' => false,

    // Add trailing slashes to URLs
    'addTrailingSlashesToUrls' => true,

    // Generate transforms before page load
    'generateTransformsBeforePageLoad' => true,
    
];
