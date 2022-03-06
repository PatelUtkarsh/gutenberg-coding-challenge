/**
 * External dependencies
 */
/**
 * WordPress dependencies
 */
import classnames from 'classnames';
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
	const props = useBlockProps.save();
	props.className = classnames( props.className, 'xwp-country-card' );
	return (
		<div>
			<Preview { ...attributes } />
		</div>
	);
}
