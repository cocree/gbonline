<?php 
// contao/dca/tl_newsletter_recipients.php
use Contao\CoreBundle\DataContainer\PaletteManipulator;

$GLOBALS['TL_DCA']['tl_newsletter_recipients']['fields']['firstname'] = [
    'label' =>  &$GLOBALS['TL_LANG']['tl_newsletter_recipients']['firstname'],
    'exclude' => false,
    'search' => true,
    'sorting' => true,
    'flag' => 1,
    'inputType' => 'text',
    'eval' => ['maxlength'=>255, 'feEditable'=>true, 'feViewable'=>true, 'feGroup'=>'newsletter', 'tl_class'=>'w50'],
    'sql' => ['type' => 'string', 'length' => 255, 'default' => ''],
];
$GLOBALS['TL_DCA']['tl_newsletter_recipients']['fields']['lastname'] = [
    'label' =>  &$GLOBALS['TL_LANG']['tl_newsletter_recipients']['lastname'],
    'exclude' => false,
    'search' => true,
    'sorting' => true,
    'flag' => 1,
    'inputType' => 'text',
    'eval' => ['maxlength'=>255, 'feEditable'=>true, 'feViewable'=>true, 'tl_class'=>'w50'],
    'sql' => ['type' => 'string', 'length' => 255, 'default' => ''],
];
$GLOBALS['TL_DCA']['tl_newsletter_recipients']['fields']['gender'] = [
    'label' =>  &$GLOBALS['TL_LANG']['tl_newsletter_recipients']['gender'],
    'exclude' => false,
    'inputType' => 'select',
    'options' => array('male', 'female', 'other'),
	'reference' => &$GLOBALS['TL_LANG']['MSC'],
    'eval' => ['includeBlankOption'=>true, 'feEditable'=>true, 'feViewable'=>true, 'tl_class'=>'w50'],
    'sql' => ['type' => 'string', 'length' => 32, 'default' => ''],
];
$GLOBALS['TL_DCA']['tl_newsletter_recipients']['fields']['churchname'] = [
    'label' =>  &$GLOBALS['TL_LANG']['tl_newsletter_recipients']['churchname'],
    'exclude' => false,
    'inputType' => 'select',
    'options' => array('Dresden-Neustadt', 'Dresden-Lockwitz', 'andere'),
	'reference' => &$GLOBALS['TL_LANG']['MSC'],
    'eval' => ['includeBlankOption'=>true, 'feEditable'=>true, 'feViewable'=>true, 'tl_class'=>'w50'],
    'sql' => ['type' => 'string', 'length' => 32, 'default' => ''],
];
$GLOBALS['TL_DCA']['tl_newsletter_recipients']['fields']['otherchurchname'] = [
    'label' =>  &$GLOBALS['TL_LANG']['tl_newsletter_recipients']['otherchurchname'],
    'exclude' => false,
    'search' => true,
    'sorting' => true,
    'flag' => 1,
    'inputType' => 'text',
    'eval' => ['maxlength'=>255, 'feEditable'=>true, 'feViewable'=>true, 'tl_class'=>'w50'],
    'sql' => ['type' => 'string', 'length' => 255, 'default' => ''],
];

PaletteManipulator::create()

   // add a new "custom_legend" before the "date_legend"
    ->addLegend('personal_legend', 'email_legend', PaletteManipulator::POSITION_BEFORE)
    ->addLegend('church_legend', 'email_legend', PaletteManipulator::POSITION_BEFORE)

    // directly add new fields to the new legend
    ->addField('lastname', 'personal_legend', PaletteManipulator::POSITION_APPEND)
    ->addField('firstname', 'personal_legend', PaletteManipulator::POSITION_APPEND)
    ->addField('gender', 'personal_legend', PaletteManipulator::POSITION_APPEND)
    ->addField('churchname', 'church_legend', PaletteManipulator::POSITION_APPEND)
    ->addField('otherchurchname', 'church_legend', PaletteManipulator::POSITION_APPEND)

    // then apply it to the palette as usual
    ->applyToPalette('default', 'tl_newsletter_recipients')
;