import React, {Component} from 'react';
import CategorySelector from './CategorySelector';
import ArrowUp from 'react-icons/lib/fa/sort-asc';
import ArrowDown from 'react-icons/lib/fa/sort-asc';

class AllPosts extends Component {
    render() {
        const posts = this.props.posts;
        const sortedIds = this.props.sortedIds;

        return (
            <div className='container'>
                <section>
                    <CategorySelector/>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <label>Sort posts by:</label>
                            <select value={this.props.sortOrder} onChange={this.handleChange}>
                                <option value="MOST_RECENT">most recent</option>
                                <option value="LEAST_RECENT">least recent</option>
                                <option value="HIGHEST_POINTS">highest points</option>
                                <option value="LOWEST_POINTS">lowest points</option>
                            </select>
                        </form>
                    </div>
                </section>
                <div>
                    <ul>
                        {sortedIds.map(postId => (
                            <li key={postId}>
                                <div className="single-post-wrapper">
                                    <div className="post-voting-icons">
                                        <ArrowUp
                                            className="up-arrow"
                                            size={20}
                                            value={postId}
                                            // onClick={() => this.upvote(postId)}
                                        />
                                        <ArrowDown
                                            className="down-arrow"
                                            size={20}
                                            value={postId}
                                            // onClick={() => this.downvote(postId)}
                                        />
                                    </div>
                                    <div>
                                        <p>{posts[postId].title}</p>
                                        <p>author: {posts[postId].author}</p>
                                    </div>
                                </div>
                            </li>
                        ))
                        }
                    </ul>
                </div>
            </div>
        )

    }
}
export default AllPosts;