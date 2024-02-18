const queryStrings ={
    app_id: process.env.REACT_APP_APPLICATION_ID,
    app_key: process.env.REACT_APP_API_KEY
}


// https://api.edamam.com/api/recipes/v2?type=public&q=pizza&app_id=454f3400&app_key=f43d43151d581bf7feb31e1d974e0ab7

export const fetchData=async(defaultQuery)=>{
    const {app_id, app_key} = {...queryStrings};
    try{
        const url=`https://api.edamam.com/api/recipes/v2?type=public&q=${defaultQuery}&app_id=${app_id}&app_key=${app_key}`;

            const data= await fetch(url);
            const response= await data.json();
            return response;

    }
    catch(err){
        console.error("Error in getting data", err);
    }

}

export const fetchTabsData=async(id)=>{
    try{
        const {app_id, app_key} = {...queryStrings};
        const url=`https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${app_id}&app_key=${app_key}`;
        const data= await fetch(url);
        const response= await data.json();
        return response;

    }
    catch(err){
        console.error("Error in getting tabs data", err);
    }
}
