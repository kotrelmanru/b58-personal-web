async function getAllTestimonials() {
  try {
    let testimonials = await fetch(
      "https://api.npoint.io/6a32de9854af3a80ee0f"
    );
    testimonials = await testimonials.json();

    const testimonialHTML = testimonials.map((testimonial) => {
      return `<div class="testimonial">
                  <img src="${testimonial.image}" class="profile-testimonial" />
                  <p class="quote">"${testimonial.content}"</p>
                  <p class="author">- ${testimonial.author}</p>
                  <p class="author"><i class="fas fa-star"></i>${testimonial.star}</p>
              </div>`;
    });

    document.getElementById("testimonials").innerHTML =
      testimonialHTML.join("");
  } catch (error) {
    console.error(error);
  }
}

async function getTestimonialByStar(star) {
  try {
    let testimonials = await fetch(
      "https://api.npoint.io/6a32de9854af3a80ee0f"
    );
    testimonials = await testimonials.json();

    const filteredTestimonials = testimonials.filter((testimonial) => {
      return testimonial.star === star;
    });

    const testimonialHTML = filteredTestimonials.map((testimonial) => {
      return `<div class="testimonial">
                <img src="${testimonial.image}" class="profile-testimonial" />
                <p class="quote">"${testimonial.content}"</p>
                <p class="author">- ${testimonial.author}</p>
                <p class="author"><i class="fas fa-star"></i>${testimonial.star}</p>
            </div>`;
    });

    document.getElementById("testimonials").innerHTML =
      testimonialHTML.join("");
  } catch (error) {
    console.error(error);
  }
}

getAllTestimonials();
