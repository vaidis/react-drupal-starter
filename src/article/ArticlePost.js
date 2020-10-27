import React from 'react';
import { connect } from 'react-redux';
import { postArticle } from './article-actions'

const Article = ({
    loaded,
    loading,
}) => {

    const [values, setValues] = React.useState({
        name: 'my name is',
        email: 'aaa@bbb.ccc',
        subject: 'my subject',
        message: 'my message',
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSumbit = (e) => {
        e.preventDefault();
        console.log("handleSumbit", e)
        const payload = {
            "contact_form": [{ "target_id": "feedback" }],
            "title": [{ "value": values.title }],
            "body": [{ "value": values.body }],
        }
        console.log('payload', payload)
        // dispatchContactPost(payload)
    }

    return (
        <div>
            Post Article

            <form onSubmit={handleSumbit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    // onChange={(e) => setName(e.target.value)}
                    onChange={handleChange('name')}
                    value={values.name}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    // onChange={(e) => setEmail(e.target.value)}
                    onChange={handleChange('email')}
                    value={values.email}
                />
                <input
                    type="subject"
                    name="subject"
                    placeholder="Subject"
                    // onChange={(e) => setMessage(e.target.value)}
                    onChange={handleChange('subject')}
                    value={values.subject}
                />
                <input
                    type="message"
                    name="message"
                    placeholder="Message"
                    // onChange={(e) => setMessage(e.target.value)}
                    onChange={handleChange('message')}
                    value={values.message}
                />
                <input
                    type="submit"
                    placeholder="Login"
                    value="Submit"
                />
            </form>
            {JSON.stringify(values)}
        </div>

    )
}

const mapDispatchToProps = dispatch => ({
    // dispatchPostArticle: payload => dispatch(postArticle(payload)),
})

const mapStateToProps = (state) => ({
    loaded: state.api.loaded,
    loading: state.api.loading,
})

export default connect(mapStateToProps, mapDispatchToProps)(Article);

