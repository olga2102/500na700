export default function () {
  const btns = document.querySelectorAll('.faq__button');
  btns.forEach((btn) => {
    btn.addEventListener('click', function () {
      const answers = document.querySelectorAll('.faq__answer');
      const parent = this.parentElement.parentElement;
      const answer = parent.querySelector('.faq__answer');
      answers.forEach((q) => {
        if (q !== answer && q.classList.contains('active')) {
          q.classList.remove('active');
        }
      });
      this.classList.toggle('active');
      answer.classList.toggle('active');
    });
  });
}
