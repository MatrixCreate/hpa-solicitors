<?php

return [
    /**
     * Search Configuration
     * 
     * Configure which sections to include/exclude from site-wide search
     */
    
    // Sections to explicitly exclude from search
    'excludedSections' => [
        'blogCategories', // Blog categories are not searchable
        'errorPages',     // Error pages should never appear in search
        'testimonials',   // No public URLs (used for display blocks only)
    ],
    
    // Results per page
    'resultsPerPage' => 10,
    
    // Maximum results per section (for grouped display)
    'maxResultsPerSection' => 5,
    
    // Section display order (sections not listed will appear after these)
    'sectionDisplayOrder' => [
        'team',
        'pages',
        'blog', 
    ],
    
    // Section display names (override default section names)
    'sectionDisplayNames' => [
        'pages' => 'Pages',
        'blog' => 'Blog Posts',
        'team' => 'Team Members',
    ],
    
    // Automatically exclude sections without entry URI format?
    'autoExcludeNonPublic' => true,
];