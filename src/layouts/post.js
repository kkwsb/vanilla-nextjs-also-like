import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import { Layout } from '../components/index';
import { withPrefix, htmlToReact, markdownify } from '../utils';
import { getPage, Link, getPageUrl } from '../utils';

export default class Post extends React.Component {
    render() {
        const data = _.get(this.props, 'data');
        const config = _.get(data, 'config');
        const page = _.get(this.props, 'page');
        const title = _.get(page, 'title');
        const subtitle = _.get(page, 'subtitle');
        const image = _.get(page, 'content_img_path');
        const imageAlt = _.get(page, 'content_img_alt', '');
        const date = _.get(page, 'date');
        const dateTimeAttr = moment(date).strftime('%Y-%m-%d %H:%M');
        const formattedDate = moment(date).strftime('%A, %B %e, %Y');
        const markdownContent = _.get(page, 'markdown_content');
        const alsoLikePost = page.also_like_post ? getPage(this.props.posts, page.also_like_post) : null;

        return (
            <Layout page={page} config={config}>
                <section className="post">
                    {image && <img className="header-image" src={withPrefix(image)} alt={imageAlt} />}
                    <header className="hero">
                        <div className="copy">
                            <h1>{title}</h1>
                            {subtitle && <h3>{htmlToReact(subtitle)}</h3>}
                            <h3 className="publish-date"><time className="published" dateTime={dateTimeAttr}>{formattedDate}</time></h3>
                        </div>
                    </header>
                    {markdownContent && <div className="content">{markdownify(markdownContent)}</div>}
                </section>
                {alsoLikePost && (
                    <section className="also-like">
                        <header><h1>Liked this post?  You might also like:</h1></header>
                        <Link key={'also-like'} href={getPageUrl(alsoLikePost, { withPrefix: true })} className="article-teaser">
                            <ul className="copy">
                                <li>{alsoLikePost.title}</li>
                            </ul>
                        </Link>
                    </section>
                )}
            </Layout>
        );
    }
}
