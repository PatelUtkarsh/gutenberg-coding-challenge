/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */
import countries from '../assets/countries.json';

const useRelatedPosts = ( countryCode ) => {
	return useSelect( ( select ) => {
		return {
			relatedPosts:
				select( 'core' )
					.getEntityRecords( 'postType', 'post', {
						per_page: -1,
						exclude: select( 'core/editor' ).getCurrentPostId(),
						search: countries[ countryCode ],
					} )
					?.map( ( relatedPost ) => ( {
						...relatedPost,
						title: relatedPost.title?.rendered || relatedPost.link,
						excerpt: relatedPost.excerpt?.rendered || '',
					} ) ) || [],
		};
	} );
};

export default useRelatedPosts;
