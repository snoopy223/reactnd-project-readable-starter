import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import CategorySelector from './CategorySelector';
import HomeButton from 'react-icons/lib/fa/home';
import PostForm from './PostForm';

class CreatePostForm extends Component {
    submitPost = ({title, author, category, body}) => {
        this.props.setPostValues({
            title, author, category, body
        });
    };

    render() {
        return (
            <div>
                <Link to={'/'}>
                    <div>
                        <HomeButton/>
                    </div>
                </Link>
                <CategorySelector/>
                <div>
                    <h2>Add a post</h2>
                    <div>
                        <PostForm onSubmit={this.submitPost()} />
                    </div>
                </div>
            </div>
        )
    }
}

export default CreatePostForm;

