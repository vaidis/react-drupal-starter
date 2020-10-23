import React from 'react';
import { connect } from 'react-redux';
import { getTerms } from './term-actions'
import { useParams } from "react-router-dom"
// import { Link } from "react-router-dom";


const Term = ({ loading, terms, dispatchGetTerms }) => {

    let { term } = useParams();

    React.useEffect(() => {
        dispatchGetTerms(term.replace(/-/g, 's%20'))
    }, [dispatchGetTerms, term]);

    console.log("terms:", terms)
    return (
        <div>
            TODO: Terms Page

            {/* {!loading &&
                terms.map((item, i) => {

                    const title = item.title;
                    const image = item.field_image;
                    const path = item.view_node;
                    const terms = item.term_node_tid.split(',');

                    return (
                        <div key={i} style={{ marginBottom: "40px" }}>
                            <Link to={path}>
                                <div>{title}</div>
                                <img src={image} alt="alt text" />
                            </Link>
                            {terms.map((term, i) => {
                                return <Link to={"/term/" + term.replace(/\s+/g, '-')} key={i}> {term} </Link>
                            })}
                        </div>
                    )
                })
            } */}

        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    dispatchGetTerms: term => dispatch(getTerms(term)),
})

const mapStateToProps = (state) => ({
    terms: state.terms,
    loading: state.api.loading,
})

export default connect(mapStateToProps, mapDispatchToProps)(Term);
