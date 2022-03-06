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

export default function Save( { attributes } ) {
	const props = useBlockProps.save();
	props.className = classnames( props.className, 'xwp-country-card' );
	return (
		<div>
			<Preview { ...attributes } />
		</div>
	);
}
