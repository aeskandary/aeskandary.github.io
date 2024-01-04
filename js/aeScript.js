document.addEventListener('DOMContentLoaded', () => {
  //open/close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  //add click events on buttons to open
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  //add click event to close
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  //grid/list view implementation
  const listViewButton = document.getElementById('list-view-button');
  const gridViewButton = document.getElementById('grid-view-button');
  const galleryItems = document.querySelectorAll('.gallery-item');

  listViewButton.addEventListener('click', () => {
    //when list view is clicked, add is-8 and is-offset-2, remove is-4
    galleryItems.forEach((galleryItem) => {
      galleryItem.classList.add('is-8','is-offset-2'); 
      galleryItem.classList.remove('is-4');
      document.body.classList.remove('grid-mode');
      document.body.classList.add('list-mode');
    });
  });

  gridViewButton.addEventListener('click', () => {
    //vice-versa for grid view
    galleryItems.forEach((galleryItem) => {
      galleryItem.classList.add('is-4'); 
      galleryItem.classList.remove('is-8','is-offset-2');
      document.body.classList.remove('list-mode');
      document.body.classList.add('grid-mode');

    });
  });

  //scrolling to the previous/next photo using arrows
    function scrollToNextPhoto() {
      const currentGalleryItem = document.querySelector('.gallery-item.active');
      const nextGalleryItem = currentGalleryItem.nextElementSibling;
      if (nextGalleryItem) {
        //scrolls to next gallery item
        nextGalleryItem.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
  
        //updates the active class
        currentGalleryItem.classList.remove('active');
        nextGalleryItem.classList.add('active');
      }
    }
    function scrollToPreviousPhoto() {
      const currentGalleryItem = document.querySelector('.gallery-item.active');
      const prevGalleryItem = currentGalleryItem.previousElementSibling;
      if (prevGalleryItem) {
        //scrolls to previous gallery item
        prevGalleryItem.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
  
        //updates the active class
        currentGalleryItem.classList.remove('active');
        prevGalleryItem.classList.add('active');
      }
    }
  //attaching scroll functions to the chevrons
  const rightChevron = document.querySelectorAll('.right-arrow');
  rightChevron.forEach((rightChevron) => {
    rightChevron.addEventListener('click', scrollToNextPhoto);
  });
  const leftChevron = document.querySelectorAll('.left-arrow');
  leftChevron.forEach((leftChevron) => {
    leftChevron.addEventListener('click', scrollToPreviousPhoto);
  });

  //making it so that the current gallery item is always the photo in view
  //handles intersection changes
  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      const galleryItem = entry.target;
      if (entry.isIntersecting) {
        //if item is in view, make it active
        galleryItem.classList.add('active');
      } else {
        //if item is no longer in view, make it inactive
        galleryItem.classList.remove('active');
      }
    });
  };
  
  //interaction observer
  const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5, 
  });
  
  //attaching observer to each item
  galleryItems.forEach((galleryItem) => {
    observer.observe(galleryItem);
  });

  //keyboard support (pressing left/right on keyboard will perform the same function as clicking on an arrow)
  document.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowRight':
        scrollToNextPhoto();
        break;
      case 'ArrowLeft':
        scrollToPreviousPhoto();
        break;
      default:
        break;
    }
  });
});  