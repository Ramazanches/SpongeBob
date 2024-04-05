const clickToLink = (e) => {
  const dataGo = e.target.dataset.goto,
        goNode = document.querySelector(dataGo),
        header = document.querySelector('header'),

        scrollToNode = (e) => {
          e.preventDefault() 

          console.log(e.target.dataset.goto)
                     
          if (dataGo && goNode) {
            const goNodeTop = goNode.getBoundingClientRect().top
            const goto = goNodeTop + pageYOffset - header.offsetHeight

            
            window.scrollTo({
              top: goto,
              behavior: "smooth"
            })
          }            
        }

        scrollToNode(e)
}