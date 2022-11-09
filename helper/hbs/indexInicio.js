const hasMovieActive = (movieList) => {
    let response = false;
    for(x = 0; x < movieList.length; x++){        
        if(movieList[x].status){
            response = true;
        }
    }
    return response;
}

exports.hasMovieActive = hasMovieActive;