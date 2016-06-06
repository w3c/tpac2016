// Don't use window.onLoad like this in production, because it can only listen to one function.
window.onload = function() {
  var eventsHandler;

  eventsHandler = {
    haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel']
  , init: function(options) {
      var instance = options.instance
        , initialScale = 1
        , pannedX = 0
        , pannedY = 0

      // Init Hammer
      // Listen only for pointer and touch events
      this.hammer = Hammer(options.svgElement, {
        inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
      })

      // Enable pinch
      this.hammer.get('pinch').set({enable: true})

      // Handle double tap
      this.hammer.on('doubletap', function(ev){
        instance.zoomIn()
      })

      // Handle pan
      this.hammer.on('panstart panmove', function(ev){
        // On pan start reset panned variables
        if (ev.type === 'panstart') {
          pannedX = 0
          pannedY = 0
        }

        // Pan only the difference
        instance.panBy({x: ev.deltaX - pannedX, y: ev.deltaY - pannedY})
        pannedX = ev.deltaX
        pannedY = ev.deltaY
      })

      // Handle pinch
      this.hammer.on('pinchstart pinchmove', function(ev){
        // On pinch start remember initial zoom
        if (ev.type === 'pinchstart') {
          initialScale = instance.getZoom()
          instance.zoom(initialScale * ev.scale)
        }

        instance.zoom(initialScale * ev.scale)

      })

      // Prevent moving the page on some devices when panning over SVG
      options.svgElement.addEventListener('touchmove', function(e){ e.preventDefault(); });
    }

  , destroy: function(){
      this.hammer.destroy()
    }
  }

  // Expose to window namespace for testing purposes
  window.panZoom = svgPanZoom('#my-embed', {
    zoomEnabled: true
  , controlIconsEnabled: true
  , fit: 1
  , center: 1
  , customEventsHandler: eventsHandler
  });
};
