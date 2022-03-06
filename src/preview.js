/**
 * External depedencies
 */
/**
 * External dependencies
 */
import sanitizeHtml from 'sanitize-html';

/**
 * WordPress dependencies
 */
import { __, _n, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import countries from '../assets/countries.json';
import continentNames from '../assets/continent-names.json';
import continents from '../assets/continents.json';
import { getEmojiFlag } from './utils';
import { ALLOWED_EXCERPT_TAGS, ALLOWED_TITLE_TAGS } from './const';

/**
 * Preview.
 *
 * @param {Object} props              Props.
 * @param {string} props.countryCode  Selected country code.
 * @param {Array}  props.relatedPosts Related posts array.
 *
 * @return {JSX.Element|null} Preview JXS element.
 */
export default function Preview( { countryCode, relatedPosts } ) {
	if ( ! countryCode ) return null;

	const emojiFlag = getEmojiFlag( countryCode ),
		hasRelatedPosts = relatedPosts?.length > 0;

	return (
		<div className="xwp-country-card">
			<div
				className="xwp-country-card__media"
				data-emoji-flag={ emojiFlag }
			>
				<div className="xwp-country-card-flag">{ emojiFlag }</div>
			</div>
			<h3 className="xwp-country-card__heading">
				{ __( 'Hello from', 'xwp-country-card' ) }{ ' ' }
				<strong>{ countries[ countryCode ] }</strong> (
				<span className="xwp-country-card__country-code">
					{ countryCode }
				</span>
				), { continentNames[ continents[ countryCode ] ] }!
			</h3>
			<div className="xwp-country-card__related-posts">
				<h4 className="xwp-country-card__related-posts__heading">
					{ hasRelatedPosts
						? sprintf(
								/* translators: %1$s is set for is/are singular / plural, %2$d is number of related posts, %3$s is for keyboard post with singular or plural based on related post count. */
								__(
									'There %1$s %2$d related %3$s:',
									'xwp-country-card'
								),
								_n(
									'is',
									'are',
									relatedPosts.length,
									'xwp-country-card'
								),
								relatedPosts.length,
								_n(
									'post',
									'posts',
									relatedPosts.length,
									'xwp-country-card'
								)
						  )
						: __(
								'There are no related posts.',
								'xwp-country-card'
						  ) }
				</h4>
				{ hasRelatedPosts && (
					<ul className="xwp-country-card__related-posts-list">
						{ relatedPosts.map( ( relatedPost, index ) => (
							<li key={ index } className="related-post">
								<a
									className="link"
									href={ relatedPost.link }
									data-post-id={ relatedPost.id }
								>
									<h3
										className="title"
										dangerouslySetInnerHTML={ {
											__html: sanitizeHtml(
												relatedPost.title,
												ALLOWED_TITLE_TAGS
											),
										} }
									/>
									<summary
										className="excerpt"
										dangerouslySetInnerHTML={ {
											__html: sanitizeHtml(
												relatedPost.excerpt,
												ALLOWED_EXCERPT_TAGS
											),
										} }
									/>
								</a>
							</li>
						) ) }
					</ul>
				) }
			</div>
		</div>
	);
}
