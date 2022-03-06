/**
 * WordPress dependencies
 */
import { edit, globe } from '@wordpress/icons';
import { BlockControls, useBlockProps } from '@wordpress/block-editor';
import {
	ComboboxControl,
	Placeholder,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './editor.scss';
import countries from '../assets/countries.json';
import { getEmojiFlag } from './utils';
import Preview from './preview';
import useRelatedPosts from './useRelatedPosts';

/**
 * Block edit.
 *
 * @param {Object}   props                         Props.
 * @param {Object}   props.attributes              Attributes.
 * @param {Function} props.setAttributes           Set attributes.
 * @param {string}   props.attributes.countryCode  Country Code.
 * @param {Array}    props.attributes.relatedPosts Related posts array.
 *
 * @return {JSX.Element} JXS element.
 */
export default function Edit( {
	attributes: { countryCode, relatedPosts },
	setAttributes,
} ) {
	const options = Object.keys( countries ).map( ( code ) => ( {
		value: code,
		label: getEmojiFlag( code ) + '  ' + countries[ code ] + ' — ' + code,
	} ) );

	const [ isPreview, setPreview ] = useState();

	useEffect( () => setPreview( countryCode ), [ countryCode ] );

	const handleChangeCountryCode = ( newCountryCode ) => {
		if ( newCountryCode && countryCode !== newCountryCode ) {
			setAttributes( {
				countryCode: newCountryCode,
				relatedPosts: [],
			} );
		}
	};

	const relatedPostsSelect = useRelatedPosts( countryCode );

	useEffect( () => {
		setAttributes( {
			relatedPosts: relatedPostsSelect?.relatedPosts,
		} );
	}, [ relatedPostsSelect, setAttributes ] );

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						label={ __( 'Change Country', 'xwp-country-card' ) }
						icon={ edit }
						onClick={ () => setPreview( ! isPreview ) }
						disabled={ ! Boolean( countryCode ) }
						isActive={ ! isPreview }
					/>
				</ToolbarGroup>
			</BlockControls>
			<div { ...useBlockProps() }>
				{ isPreview ? (
					<Preview
						countryCode={ countryCode }
						relatedPosts={ relatedPosts }
					/>
				) : (
					<Placeholder
						icon={ globe }
						label={ __( 'XWP Country Card', 'xwp-country-card' ) }
						isColumnLayout={ true }
						instructions={ __(
							'Type in a name of a country you want to display on you site.',
							'xwp-country-card'
						) }
					>
						<ComboboxControl
							label={ __( 'Country', 'xwp-country-card' ) }
							hideLabelFromVision
							options={ options }
							value={ countryCode }
							onChange={ handleChangeCountryCode }
							allowReset={ true }
						/>
					</Placeholder>
				) }
			</div>
		</>
	);
}
