import React from "react"
import Helmet from 'react-helmet';
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import PostLink from "../components/post-link"
import HeroHeader from "../components/heroHeader"

const IndexPage = ({
  data: {
    site,
    allMarkdownRemark: { edges },
  },
}) => {

  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return (
    <Layout>
      <Helmet>
        <title>{site.siteMetadata.title}</title>
        <meta name="description" content={site.siteMetadata.description} />
      </Helmet>
      <HeroHeader/>
      <div>
      <h2>
        Background
      </h2>
      <description>I'm an independent developer currently based in <b>Dorset, UK</b>. I have been making games since the age of 13 with most
      my knowledge aquired from developing prototypes within the unity engine. I have since dabbled in other forms of software development,
      creating my fitness app <b>FisherFitnessPal</b> for mobile devices using the Xamarin framework. I find myself frequently tackling game mechanics that fascinate me 
      such as procedural generation and how it can be used to create realistic voxel landscapes, as well as adding multiplayer functionality (as can be seen in my upcoming 
      title <b>Monstars</b>). Due to the nature of being an indie developer, I have also learn't how to model, texture and animate anything 
      required for the games I create, which helps make my gameplay design choices well grounded as I am able to think about the bigger picture.</description>
      </div>
      <br></br>
      <h2>Here are some of my recent projects! &darr;</h2>
      <div className="grids">
        {Posts}
      </div>
    </Layout>
  )
}

export default IndexPage
export const pageQuery = graphql`
  query indexPageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            tags
            date(formatString: "MMMM DD, YYYY")
            path
            title
            thumbnail
          }
        }
      }
    }
  }
`
