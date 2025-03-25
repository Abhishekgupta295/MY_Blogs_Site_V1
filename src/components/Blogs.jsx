import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import Spinner from './Spinner'


const Blogs = () => {
 
  // consumming the BlogsContext
  const {loading, posts} = useContext(AppContext)
  return (
    <div  className='w-11/12 max-w-[670px] h-screen py-8 flex flex-col gap-y-7 mt-[66px] mb-[70px]  justify-center items-center'>
      {
        loading ? 

          (<Spinner />) : 
          
          ( 
            posts.length === 0 ?
            (<div>NO POST Found</div>) : 
            ( posts.map((post) =>
              (
                <div key={post.id}>
                  <p className="font-bold text-lg ">{post.title}</p>
                  <p className='text-sm mt-[4px]'>
                    By <span className='italic' >{post.author}</span> on <span className='underline font-bold'>{post.category}</span>
                  </p>
                  <p className='text-sm mt-[4px]'>Posted on <span>{post.date}</span></p>
                  <p className='text-md mt-[14px]'>{post.content}</p>
                  <p className='flex gap-x-3'>
                    {
                      post.tags.map((tag , index) => (  // map through the tags array, each tag is given a unique key using index
                        <span key={index} className="text-blue-700 underline font-bold text-xs mt-[5px]"> {`#${tag}`}</span>
                      ))
                    }
                  </p>
                </div>
              ) )
            )  
          )
      }
    </div>
  )
}

export default Blogs