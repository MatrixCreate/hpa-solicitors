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
            'color'           => '#5D5D5D',
            'text'            => 'text-dark-grey',
            'heading'         => 'heading-dark-grey',
            'background'      => 'bg-dark-grey',
            'textHover'       => 'hover:text-dark-grey',
            'backgroundHover' => 'hover:bg-dark-grey',
          ]
        ],
      ],
      [
        'label'   => 'Grey', 
        'default' => false,
        'color'   => [
          [
            'color'           => '#ADAFAF',
            'text'            => 'text-grey',
            'heading'         => 'heading-grey',
            'background'      => 'bg-grey',
            'textHover'       => 'hover:text-grey',
            'backgroundHover' => 'hover:bg-grey',
          ]
        ],
      ],
      [
        'label'   => 'Medium Grey', 
        'default' => false,
        'color'   => [
          [
            'color'           => '#F4F4F4',
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
            'color'           => '#FCFCFC',
            'text'            => 'text-light-grey',
            'heading'         => 'heading-light-grey',
            'background'      => 'bg-light-grey',
            'textHover'       => 'hover:text-light-grey',
            'backgroundHover' => 'hover:bg-light-grey',
          ]
        ],
      ],
      [
        'label'   => 'Dark Navy', 
        'default' => false,
        'color'   => [
          [
            'color'           => '#18283B',
            'text'            => 'text-dark-navy',
            'heading'         => 'heading-dark-navy',
            'background'      => 'bg-dark-navy',
            'textHover'       => 'hover:text-dark-navy',
            'backgroundHover' => 'hover:bg-dark-navy',
          ]
        ],
      ],
      [
        'label'   => 'Gold', 
        'default' => false,
        'color'   => [
          [
            'color'           => '#B68E34',
            'text'            => 'text-gold',
            'heading'         => 'heading-gold',
            'background'      => 'bg-gold',
            'textHover'       => 'hover:text-gold',
            'backgroundHover' => 'hover:bg-gold',
          ]
        ],
      ],
      [
        'label'   => 'Light Gold', 
        'default' => false,
        'color'   => [
          [
            'color'           => '#CFBD9A',
            'text'            => 'text-light-gold',
            'heading'         => 'heading-light-gold',
            'background'      => 'bg-light-gold',
            'textHover'       => 'hover:text-light-gold',
            'backgroundHover' => 'hover:bg-light-gold',
          ]
        ],
      ],
      [
        'label'   => 'Cream', 
        'default' => false,
        'color'   => [
          [
            'color'           => '#FCF7EC',
            'text'            => 'text-cream',
            'heading'         => 'heading-cream',
            'background'      => 'bg-cream',
            'textHover'       => 'hover:text-cream',
            'backgroundHover' => 'hover:bg-cream',
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
        'label'   => 'Dark Navy', 
        'default' => false,
        'color'   => [
          [
            'color'           => '#18283B',
            'text'            => 'text-dark-navy',
            'heading'         => 'heading-dark-navy',
            'background'      => 'bg-dark-navy',
            'textHover'       => 'hover:text-dark-navy',
            'backgroundHover' => 'hover:bg-dark-navy',
          ]
        ],
      ],
      [
        'label'   => 'Gold', 
        'default' => false,
        'color'   => [
          [
            'color'           => '#B68E34',
            'text'            => 'text-gold',
            'heading'         => 'heading-gold',
            'background'      => 'bg-gold',
            'textHover'       => 'hover:text-gold',
            'backgroundHover' => 'hover:bg-gold',
          ]
        ],
      ],
      [
        'label'   => 'Light Gold', 
        'default' => false,
        'color'   => [
          [
            'color'           => '#CFBD9A',
            'text'            => 'text-light-gold',
            'heading'         => 'heading-light-gold',
            'background'      => 'bg-light-gold',
            'textHover'       => 'hover:text-light-gold',
            'backgroundHover' => 'hover:bg-light-gold',
          ]
        ],
      ],
      [
        'label'   => 'Cream', 
        'default' => false,
        'color'   => [
          [
            'color'           => '#FCF7EC',
            'text'            => 'text-cream',
            'heading'         => 'heading-cream',
            'background'      => 'bg-cream',
            'textHover'       => 'hover:text-cream',
            'backgroundHover' => 'hover:bg-cream',
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