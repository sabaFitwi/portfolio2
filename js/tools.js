fetch('json/tools.json')
.then(response => response.json())
.then(data => {
   
    const container = document.querySelector('.tools');
    const badges = data.tools

    badges.forEach(badge => {
        
        const img = document.createElement('img');

      
        img.src = badge.src;
        img.alt = badge.alt;

    
        container.appendChild(img);
    });
})
.catch(error => console.error('Error fetching badges.json:', error));