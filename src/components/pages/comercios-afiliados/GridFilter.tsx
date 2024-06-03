"use client";

import Grid from "@/components/pages/comercios-afiliados/Content/grid";
import CategoryDropdown from "@/components/pages/comercios-afiliados/Header/categoryDropdown";
import { useState } from "react";

const GridFilter = () => {
    
    const [filterText, handleTextChange] = useState("");
    const [category, handleCategories] = useState("");
  
    return (
     <>
      <CategoryDropdown handleTextChange={handleTextChange} filterText={filterText} handleCategories={handleCategories} />
      <Grid filterText={filterText} category={category}/>
     </>
    );
  };
  
  export default GridFilter;