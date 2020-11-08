  import React from 'react';
import { Link } from "react-router-dom"

/**
 * @params {string} tag - term alias from backend
 * @returns (string) link - term link for frontend
*/
const TermLink = ({ tag }) => {
  const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)
  const link = <Link to={"/?terms=" + getLastItem(tag.name)}> {tag.name}</Link>
  return link
}

export default TermLink;
