/**
 * Usage and Examples
 * @example
 * // Add several animations and build WAAPI-Instances
 * const ball = document.querySelector(".ball");
 * const motion = new Motion(ball)
 *   .rise({ duration: 1000, easing: "ease-out" })
 *   .scale({ duration: 2200, easing: "ease-in", fill: "forwards" })
 *   .build({ autopause: true, stagger: 0 });
 * 
 * @example
 * // Control WAAPI-Instances
 * setTimeout(() => motion.play(), 4000);
 * motion.onfinish(() => console.log("all done"));
 * motion.seek(500);
 * motion.play(["rise"]);
 * motion.reverse();           
 */

class Motion {
  #defs = [];       // collected definitions (no WAAPI instances yet)
  #anims = [];      // created Animation objects
  #byId  = new Map();
  #defaultOptions = {duration: 1000, fill: "forwards"};
  el;

  constructor(el) { this.el = el; }

  // Low-level: add arbitrary keyframes
  add(id, keyframes, options = {}) {
    this.#defs.push({ id, keyframes, options });
    return this;
  }

  // High-level: convenience builders (use individual transform props)
  rise(options = this.#defaultOptions) {
    return this.add("rise", [{ translate: "0 100%" }, { translate: "0 0%" }], options);
  }
  scale(options = this.#defaultOptions) {
    return this.add("scale", [{ scale: "0" }, { scale: "1" }], options);
  }
  reveal(options = this.#defaultOptions) {
    return this.add("reveal", [{ opacity: "0" }, { opacity: "1" }], options);
  }
  growX(options = this.#defaultOptions) {
    return this.add("growX", [{ width: "0" }, { width: "130%" }], options);
  }
  gradientYMove(options = this.#defaultOptions) {
    return this.add("gradientYMove", [{ '--sun-gradient-y': '200%' }, { '--sun-gradient-y': '0%' }], options);
  }
  gradientXMove(options = this.#defaultOptions) {
    return this.add("gradientXMove", [{ '--sun-gradient-x': '5%' }, { '--sun-gradient-x': '50%' }], options);
  }

  /**
   * Creates WAAPI instances from the collected defs
   * @param {Object} opts
   * @param {boolean} opts.autopause - pause immediately after creation
   * @param {string}  opts.defaultFill - default fill for all
   * @param {number}  opts.stagger - ms added as additional delay per track
   */
  build({ autopause = true, defaultFill = "both", stagger = 0 } = {}) {
    // Clean up previous instances
    this.cancel();

    let i = 0;
    this.#anims = this.#defs.map(({ id, keyframes, options }) => {
      const delayAdd = stagger * (i++);
      const anim = this.el.animate(keyframes, {
        fill: defaultFill,
        ...options,
        // if options.delay is set, the stagger is added
        delay: (options.delay ?? 0) + delayAdd,
      });
      anim.id = id;
      this.#byId.set(id, anim);
      return anim;
    });

    if (autopause) this.pause();
    return this;
  }

  // --- Control (all or subset by IDs) ---
  #select(ids) {
    if (!ids) return this.#anims;
    return ids.map(id => this.#byId.get(id)).filter(Boolean);
  }

  play(ids)    { this.#select(ids).forEach(a => a.play());    return this; }
  pause(ids)   { this.#select(ids).forEach(a => a.pause());   return this; }
  reverse(ids) { this.#select(ids).forEach(a => a.reverse()); return this; }
  finish(ids)  { this.#select(ids).forEach(a => a.finish());  return this; }
  cancel(ids)  { this.#select(ids).forEach(a => a.cancel());  return this; }

  // Seek/Sync
  seek(ms, ids) { this.#select(ids).forEach(a => a.currentTime = ms); return this; }
  get time()    { return Math.max(0, ...this.#anims.map(a => a.currentTime ?? 0)); }
  set time(ms)  { this.seek(ms); }

  // Events
  onfinish(cb, ids) { this.#select(ids).forEach(a => a.onfinish = cb); return this; }

  // Utils
  get(id) { return this.#byId.get(id); }
}

export default Motion;