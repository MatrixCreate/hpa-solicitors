<?php
/**
* color-swatches plugin for Craft CMS 3.x.
*
* Let clients choose from a predefined set of colours.
*
* @link      https://percipio.london
*
* @copyright Copyright (c) 2020 Percipio.London
*/

/**
* colour-swatches config.php.
*
* This file exists only as a template for the color-swatches settings.
* It does nothing on its own.
*
* Don't edit this file, instead copy it to 'craft/config' as 'colour-swatches.php'
* and make your changes there to override default settings.
*
* Once copied to 'craft/config', this file will be multi-environment aware as
* well, so you can have different settings groups for each environment, just as
* you do for 'general.php'
*/


return [
  // Predefined colour palettes
  'palettes' => [
    'Background Colours' => [
      [
        'label'   => 'White',
        'default' => true,
        'color'   => [
          [
            'color'           => '#FFFFFF',
            'text'            => 'text-white',
            'heading'         => 'heading-white',
            'background'      => 'bg-white',
            'textHover'       => 'hover:text-white',
            'backgroundHover' => 'hover:bg-white',
          ]
        ]
      ],
      [
        'label'   => 'Black', 
        'default' => false,
        'color'   => [
          [
            'color'           => '#181818',
            'text'            => 'text-black',
            'heading'         => 'heading-black',
            'background'      => 'bg-black',
            'textHover'       => 'hover:text-black',
            'backgroundHover' => 'hover:bg-black',
          ]
        ],
      ],
      [
        'label'   => 'Dark Grey', 
        'default' => false,
        'color'   => [
          [
            'color'           => '#666666',
            'text'            => 'text-dark-grey',
            'heading'         => 'heading-dark-grey',
            'background'      => 'bg-dark-grey',
            'textHover'       => 'hover:text-dark-grey',
            'backgroundHover' => 'hover:bg-dark-grey',
          ]
        ],
      ],
      [
        'label'   => 'Medium Grey', 
        'default' => false,
        'color'   => [
          [
            'color'           => '#999999',
            'text'            => 'text-medium-grey',
            'heading'         => 'heading-medium-grey',
            'background'      => 'bg-medium-grey',
            'textHover'       => 'hover:text-medium-grey',
            'backgroundHover' => 'hover:bg-medium-grey',
          ]
        ],
      ],
      [
        'label'   => 'Light Grey', 
        'default' => false,
        'color'   => [
          [
            'color'           => '#f5f5f5',
            'text'            => 'text-light-grey',
            'heading'         => 'heading-light-grey',
            'background'      => 'bg-light-grey',
            'textHover'       => 'hover:text-light-grey',
            'backgroundHover' => 'hover:bg-light-grey',
          ]
        ],
      ],
      [
        'label'   => 'Dark Blue', 
        'default' => false,
        'color'   => [
          [
            'color'           => '#149BD7',
            'text'            => 'text-dark-blue',
            'heading'         => 'heading-dark-blue',
            'background'      => 'bg-dark-blue',
            'textHover'       => 'hover:text-dark-blue',
            'backgroundHover' => 'hover:bg-dark-blue',
          ]
        ],
      ],
      [
        'label'   => 'Light Blue', 
        'default' => false,
        'color'   => [
          [
            'color'           => '#48C0F5',
            'text'            => 'text-light-blue',
            'heading'         => 'heading-light-blue',
            'background'      => 'bg-light-blue',
            'textHover'       => 'hover:text-light-blue',
            'backgroundHover' => 'hover:bg-light-blue',
          ]
        ],
      ],
      [
        'label'   => 'Pale Blue', 
        'default' => false,
        'color'   => [
          [
            'color'           => '#bfebff',
            'text'            => 'text-pale-blue',
            'heading'         => 'heading-pale-blue',
            'background'      => 'bg-pale-blue',
            'textHover'       => 'hover:text-pale-blue',
            'backgroundHover' => 'hover:bg-pale-blue',
          ]
        ],
      ],
      [
        'label'   => 'Dark Orange', 
        'default' => false,
        'color'   => [
          [
            'color'           => '#ed7712',
            'text'            => 'text-dark-orange',
            'heading'         => 'heading-dark-orange',
            'background'      => 'bg-dark-orange',
            'textHover'       => 'hover:text-dark-orange',
            'backgroundHover' => 'hover:bg-dark-orange',
          ]
        ],
      ],
      [
        'label'   => 'Light Orange', 
        'default' => false,
        'color'   => [
          [
            'color'           => '#ffc107',
            'text'            => 'text-light-orange',
            'heading'         => 'heading-light-orange',
            'background'      => 'bg-light-orange',
            'textHover'       => 'hover:text-light-orange',
            'backgroundHover' => 'hover:bg-light-orange',
          ]
        ],
      ],
      [
        'label'   => 'Pale Orange', 
        'default' => false,
        'color'   => [
          [
            'color'           => '#ffe79f',
            'text'            => 'text-pale-orange',
            'heading'         => 'heading-pale-orange',
            'background'      => 'bg-pale-orange',
            'textHover'       => 'hover:text-pale-orange',
            'backgroundHover' => 'hover:bg-pale-orange',
          ]
        ],
      ],
      [
        'label'   => 'None',
        'default' => false,
        'color'   => [
          [
            'color'           => 'transparent',
            'text'            => 'text-none',
            'heading'         => 'heading-none',
            'background'      => 'bg-none',
            'textHover'       => 'hover:text-none',
            'backgroundHover' => 'hover:bg-none',
          ]
        ],
      ],
    ],
    'Text Colours' => [
      [
        'label'   => 'Black', 
        'default' => true,
        'color'   => [
          [
            'color'           => '#181818',
            'text'            => 'text-black',
            'heading'         => 'heading-black',
            'background'      => 'bg-black',
            'textHover'       => 'hover:text-black',
            'backgroundHover' => 'hover:bg-black',
          ]
        ],
      ],
      [
        'label'   => 'White',
        'default' => false,
        'color'   => [
          [
            'color'           => '#FFFFFF',
            'text'            => 'text-white',
            'heading'         => 'heading-white',
            'background'      => 'bg-white',
            'textHover'       => 'hover:text-white',
            'backgroundHover' => 'hover:bg-white',
          ]
        ],
      ],
      [
        'label'   => 'Pale Blue',
        'default' => false,
        'color'   => [
          [
            'color'           => '#bfebff',
            'text'            => 'text-pale-blue',
            'heading'         => 'heading-pale-blue',
            'background'      => 'bg-pale-blue',
            'textHover'       => 'hover:text-pale-blue',
            'backgroundHover' => 'hover:bg-pale-blue',
          ]
        ],
      ],
      [
        'label'   => 'Light Blue', 
        'default' => false,
        'color'   => [
          [
            'color'           => '#48C0F5',
            'text'            => 'text-light-blue',
            'heading'         => 'heading-light-blue',
            'background'      => 'bg-light-blue',
            'textHover'       => 'hover:text-light-blue',
            'backgroundHover' => 'hover:bg-light-blue',
          ]
        ],
      ],
      [
        'label'   => 'Dark Orange', 
        'default' => false,
        'color'   => [
          [
            'color'           => '#ed7712',
            'text'            => 'text-dark-orange',
            'heading'         => 'heading-dark-orange',
            'background'      => 'bg-dark-orange',
            'textHover'       => 'hover:text-dark-orange',
            'backgroundHover' => 'hover:bg-dark-orange',
          ]
        ],
      ],
      [
        'label'   => 'Light Orange', 
        'default' => false,
        'color'   => [
          [
            'color'           => '#ffc107',
            'text'            => 'text-light-orange',
            'heading'         => 'heading-light-orange',
            'background'      => 'bg-light-orange',
            'textHover'       => 'hover:text-light-orange',
            'backgroundHover' => 'hover:bg-light-orange',
          ]
        ],
      ],
      [
        'label'   => 'None',
        'default' => false,
        'color'   => [
          [
            'color'           => 'transparent',
            'text'            => 'text-none',
            'heading'         => 'heading-none',
            'background'      => 'bg-none',
            'textHover'       => 'hover:text-none',
            'backgroundHover' => 'hover:bg-none',
          ]
        ],
      ],
    ],
    'Colour Theme' => [
      [
        'label'   => 'Dark Blue/White',
        'default' => false,
        'color'   => [
          [
            'color'             => '#149BD7',
            'text'              => 'text-white',
            'heading'           => 'heading-dark-blue',
            'background'        => 'bg-dark-blue',
            'backgroundHover'   => 'hover:bg-dark-blue',
            'textHover'         => 'hover:text-white',
            'headings'          => 'headings-dark-blue',
          ],
          [
            'color'             => '#FFFFFF',
            'text'              => 'text-dark-blue',
            'heading'           => 'heading-white',
            'background'        => 'bg-white',
            'backgroundHover'   => 'hover:bg-white',
            'textHover'         => 'hover:text-dark-blue',
            'headings'          => 'headings-white',
          ]
        ]
      ],
      [
        'label'   => 'Dark Orange/White',
        'default' => false,
        'color'   => [
          [
            'color'             => '#ed7712',
            'text'              => 'text-white',
            'heading'           => 'heading-dark-orange',
            'background'        => 'bg-dark-orange',
            'backgroundHover'   => 'hover:bg-dark-orange',
            'textHover'         => 'hover:text-white',
            'headings'          => 'headings-dark-orange',
          ],
          [
            'color'             => '#FFFFFF',
            'text'              => 'text-dark-orange',
            'heading'           => 'heading-white',
            'background'        => 'bg-white',
            'backgroundHover'   => 'hover:bg-white',
            'textHover'         => 'hover:text-dark-orange',
            'headings'          => 'headings-white',
          ]
        ]
      ],
    ],
  ]
];