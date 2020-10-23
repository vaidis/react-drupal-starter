import React from 'react';
import { connect } from 'react-redux';
// import { Link } from "react-router-dom";

const Pager = ({ loading, pager }) => {

    // const termUrl = "/taxonomy/"
    // const firs = 0;
    // const [prev, setPrev] = React.useState("");
    const [next, setNext] = React.useState("");
    // const [last, setLast] = React.useState("");

    // const [ urlFirs, setUrlFirs] = React.useState("/")
    // const [ urlPrev, setUrlPrev] = React.useState("/")
    // const [ urlNext, setUrlNext] = React.useState("/")
    // const [ urlLast, setUrlLast] = React.useState("/")

    React.useEffect(() => {

        // setPrev(pager.current_page - 1)
        // setNext(pager.current_page + 1)
        // setLast(pager.total_pages - 1)

        // urlFirst = termUrl + first
        // urlPrev = termUrl + prev
        // setUrlNext(termUrl + next)
        // urlLast = termUrl + last

    }, [pager]);

    return (
        <div>
            <button onClick={() => console.log("NEXT")}> [{next} Next] </button>
        </div>
    );
}

const mapStateToProps = (state) => ({
    articlesPager: state.articles.pager,
    pager: state.pager,
    loading: state.api.loading,
})

export default connect(mapStateToProps, null)(Pager);
