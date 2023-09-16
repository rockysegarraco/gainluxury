import React from 'react'
import PortableText from "react-portable-text"

const ContentText = ({ content }) => {
    return (
        <div>
            <PortableText
                // Pass in block content straight from Sanity.io
                content={content}
                projectId='mxeqjvwt'
                dataset='production'
                serializers={{
                    h1: (props) => <h1 {...props} />,
                    li: ({ children }) => <li className="special-list-item">{children}</li>,
                    
                  }}
            />
        </div>
    )
}

export default ContentText