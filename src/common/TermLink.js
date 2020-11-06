import React from 'react';
import { Link } from "react-router-dom"

const TermLink = ({ tag }) => {
  const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)
  return (
    <Link to={"/?terms=" + getLastItem(tag.name)}> {tag.name}</Link>
  )
}

export default TermLink;
