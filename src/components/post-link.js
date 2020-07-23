import React from "react"
import { Link } from "gatsby"
import { Badge } from 'reactstrap'
import {slugify} from '../util/utilityFunctions'
import { color} from '../util/utilityColorTag'
const PostLink = ({ post }) => (
  <article className="card ">
    <Link to={post.frontmatter.path}>
      {!!post.frontmatter.thumbnail && (
        <img className="post-image" src={post.frontmatter.thumbnail} alt={post.frontmatter.title + "- Featured Shot"} />
      )}
    </Link>
    <header>
      <h2 className="post-title">
        <Link to={post.frontmatter.path} className="post-link">
          {post.frontmatter.title}
        </Link>
      </h2>
      <ul className="post-tags">
        {post.frontmatter.tags
        .filter(tag => !!tag)
        .map(tag =>(
        <li>
          <div className = {color(tag)}>
            {tag}</div>
        </li>
        ))}
      </ul>
      <div className="post-meta">{post.frontmatter.date}</div>
    </header>
  </article>
)


export default PostLink
