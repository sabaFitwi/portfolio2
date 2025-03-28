// Fetch the badges.json file
fetch('json/badges.json')
    .then(response => response.json())
    .then(data => {
       
        const container = document.querySelector('.badges');
        const badges = data.badges
    
        badges.forEach(badge => {
            
            const img = document.createElement('img');

          
            img.src = badge.src;
            img.alt = badge.alt;

        
            container.appendChild(img);
        });
    })
    .catch(error => console.error('Error fetching badges.json:', error));
//Tools
