import React, { useState } from "react";
import { createContext } from "react";
import {baseUrl} from "../baseURL";

// Step 1: create the context
export const AppContext = createContext(); // creation of the context is done here because it is used in multiple components

export default function AppContextProvider({ children }) //here we need to pass the children as props ,
// children are the elements which are wrapped inside the AppContextProvider i.e <APP> component inthis case. (refer to main.jsx)
{
    const [loading , setLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)
    
   

    // data filling pending
    async function fetchBlogPosts (page = 1){
        
        // hardcoded default value of page is 1, means first page is loaded by default
        setLoading(true)
        let url = `${baseUrl}?page=${page}`
        try{
           console.log("fetching data") 
           const response = await fetch (url)
           const data = await response.json()
           console.log(data)
           setPosts(data.posts)
           console.log(data.posts)
           setTotalPages(data.totalPages)
           setPage(data.page)

        }

        catch(error){
            console.log("error in fetching data", error)
            setPage(1)
            setPosts([])
            setTotalPages(null)
        }
        setLoading(false)
    }

    function handlePageChange(page){
        setPage(page)
        fetchBlogPosts(page)
    }


        // value is an object that provides data and methods to the components that consume this context.
        const value = {
            loading,
            setLoading,
            posts,
            setPosts,
            page,
            setPage,
            totalPages,
            setTotalPages,
            fetchBlogPosts,
            handlePageChange,
        }

    // step 2: Providing the context to the main component
    return <AppContext.Provider value={value}> 
        {children} {/* here we are passing the children as a prop to AppContextProvider, which is then rendered in the main component */}
    </AppContext.Provider>
}