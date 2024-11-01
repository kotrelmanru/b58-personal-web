const testimonials = [
    {
      image:
        "https://variety.com/wp-content/uploads/2022/07/Elon-Musk-Twitter-deal.jpg?w=1000&h=667&crop=1",
      content: "Mantap bro, ini mobil tesla untukmu",
      author: "Elon Musk",
      star: 5,
    },
    {
      image:
        "https://asset-2.tstatic.net/mataram/foto/bank/images/mark-zuckerberg.jpg",
      content: "Luar biasa, mau ga jadi developer google?",
      author: "Mark Zuckenberg",
      star: 3,
    },
    {
      image:
        "https://voffice.co.id/blog/wp-content/uploads/2018/11/biografi-bill-gates.jpg",
      content: "Sip, nanti Microsoft kasih komputer quantum super canggih untukmu",
      author: "Bill Gates",
      star: 4,
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVpClp9g4Uo8Ur3u6WAP9BnMyZoOZvpp-Gxw&s",
      content: "Oke, Chat-gpt butuh developer nih bro",
      author: "Sam Altman",
      star: 5,
    },
    {
        image:
          "https://cdn.webshopapp.com/shops/268192/files/433182622/tommy-shelby.jpg",
        content: "Good, Peaky Blinders butuh angota baru nih, join kuy",
        author: "Thomas Shelby",
        star: 5,
      },
  ];
  
  
  function getAllTestimonials() { 
    const testimonialHTML = testimonials.map((testimonial) => {
      return `<div class="testimonial">
                <img src="${testimonial.image}" class="profile-testimonial" />
                <p class="quote">"${testimonial.content}"</p>
                <p class="author">- ${testimonial.author}</p>
                <p class="author"><i class="fas fa-star"></i>${testimonial.star}</p>
            </div>`
    })
    
    document.getElementById("testimonials").innerHTML = testimonialHTML.join("")
  }
  
  function getTestimonialByStar(star) {
    const filteredTestimonials = testimonials.filter((testimonial) => {
      return testimonial.star === star
    })
  
    const testimonialHTML = filteredTestimonials.map((testimonial) => {
      return `<div class="testimonial">
                <img src="${testimonial.image}" class="profile-testimonial" />
                <p class="quote">"${testimonial.content}"</p>
                <p class="author">- ${testimonial.author}</p>
                <p class="author"><i class="fas fa-star"></i>${testimonial.star}</p>
            </div>`
    })
    
    document.getElementById("testimonials").innerHTML = testimonialHTML.join("")
  }
  
  getAllTestimonials()