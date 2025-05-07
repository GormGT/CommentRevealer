// script to reveal comments on a page. Originally made for tdwtf, however can be used on other sites as well

function getAllComments(){

    // check if the site is tdwtf, if true check for comments in the article body. Otherwise, check the entire page.
    if(document.querySelector('meta[content="The Daily WTF"]')){
        mainElement = document.querySelector('div.article-body');
    }else{
        mainElement = document.body;
    }
    
    let comments = [];
    let iterator = document.createNodeIterator(mainElement, NodeFilter.SHOW_COMMENT);
    while (curNode = iterator.nextNode()) {
        comments.push(curNode);
    }
    return comments;
}

function displayComments(commentArray){
    if(commentArray.length <= 0){
        console.log("No comments to display.");
    }else{
        commentArray.forEach(comment => {
            //create a new p-tag with the content of the comment, and append it after the comment
            let p = document.createElement("p");
            p.classList.add("displayedComment");

            //give the displayed comments a unique appearance
            p.style.color = "none";
            p.style.backgroundColor = "none";
            p.style.lineHeight = "0px";
            p.style.borderRadius = "5px";
            p.style.padding = "0px 12px";
            p.style.marginBottom = "0px";
            p.style.transform = "scale(1, 0)";
            
            p.style.transformOrigin = "top";
            p.style.transition = "0.5s ease-out";
            p.textContent = `${comment.textContent}`;

            //insert the displayed comment after the actual comment
            comment.after(p);

            //force-apply the previous styles in order to have the comment appear through a smooth animation
            void p.offsetWidth;
            
            p.style.color = "black";
            p.style.backgroundColor = "lightgreen";
            p.style.lineHeight = "1.625em";
            p.style.padding = "12px";
            p.style.marginBottom = "15px";
            p.style.transform = "scale(1, 1)";

            p.style.transform = "none";
        })
        console.log(`Displayed ${commentArray.length} hidden comment(s).`);
    }
}

if(!document.querySelector(".displayedComment")){
    let allComments = getAllComments();
    displayComments(allComments);    
}else{
    console.log("Comments already displayed.");
}