const calcScrollPercent = (start, end) => {
  let scrollTop = window.pageYOffset;
  
  if (scrollTop < start) {
    scrollTop = start + 1;
  } else if (scrollTop > end) {
    scrollTop = end;
  }

  return (scrollTop - start) / (end - start);
}

export default {
  calcScrollPercent
};