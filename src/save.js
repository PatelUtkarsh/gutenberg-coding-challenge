/**
 * External dependencies
 */
/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */
import Preview from './preview';

/**
 * Save.
 *
 * @param {Object} props            Props.
 * @param {Object} props.attributes Attributes.
 *
 * @return {JSX.Element} Save element.
 */
export default function Save( { attributes } ) {
	return (
		<div { ...useBlockProps.save() }>
			<Preview { ...attributes } />
		</div>
	);
}
