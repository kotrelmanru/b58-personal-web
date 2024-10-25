class Testimonial {
  constructor(image, content, author, star) {
    this.image = image;
    this.content = content;
    this.author = author;
    this.star = star;
  }

  toHTML() {
    let stars = "";
    for (let i = 0; i < this.star; i++) {
      stars += `<i class="fas fa-star"></i>`;
    }

    return `<div class="testimonial">
            <img src="${this.image}" class="profile-testimonial" />
            <p class="quote">"${this.content}"</p>
            <p class="author">- ${this.author}</p>
            <p class="author">${stars}</p>
        </div>`;
  }
}

const testimonials = [
  {
    image:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
    content: "Mantap sekali bro!",
    author: "Anto",
    star: 5,
  },
  {
    image:
      "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600",
    content: "Okelah!",
    author: "Anta",
    star: 3,
  },
  {
    image:
      "https://images.pexels.com/photos/28973974/pexels-photo-28973974/free-photo-of-wanita-muda-tersenyum-di-dinding-grafiti.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: "Aku sih YES",
    author: "Anti",
    star: 4,
  },
];

let testimonialHTML = "";
for (let index = 0; index < testimonials.length; index++) {
  const { image, content, author, star } = testimonials[index];
  testimonialHTML += new Testimonial(image, content, author, star).toHTML();
}

document.getElementById("testimonials").innerHTML = testimonialHTML;
