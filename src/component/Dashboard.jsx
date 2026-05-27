import { useEffect } from 'react';

const Dashboard = () => {
  useEffect(() => {
    const observerOptions = { threshold: 0.05, rootMargin: '0px 0px -20px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ─── Hero ─── */}
      <section id="hero">
        <div className="hero-badge">
          <span className="dot"></span>
          Intelligent Logistics · Now Live in London
        </div>
        <h1 className="hero-headline">
          Where artificial intelligence<br />
          meets <em>the art of luxury.</em>
        </h1>
        <p className="hero-sub">
          Booster is the world's first AI-orchestrated logistics network engineered exclusively
          for luxury. We turn the distance between desire and delivery into minutes.
        </p>
        <div className="hero-actions">
          <a href="#dispatch" className="btn-primary">Request Access</a>
          <a href="#how" className="btn-secondary">See the intelligence</a>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <p className="stat-value">&lt;60</p>
            <p className="stat-label">Minutes, on average</p>
          </div>
          <div className="stat">
            <p className="stat-value">100%</p>
            <p className="stat-label">Zero-emission fleet</p>
          </div>
          <div className="stat">
            <p className="stat-value">✦</p>
            <p className="stat-label">White-glove standard</p>
          </div>
        </div>
      </section>

      <div className="warm-rule"></div>

      {/* ─── Promise ─── */}
      <div id="promise">
        <div className="promise-grid">
          <div className="promise-item reveal">
            <span className="promise-icon">◎</span>
            <p className="promise-title">Predictive Orchestration</p>
            <p className="promise-desc">
              Our routing intelligence anticipates demand and positions capacity before you ever
              place an order — so fulfilment begins the moment you decide.
            </p>
          </div>
          <div className="promise-item reveal reveal-delay-1">
            <span className="promise-icon">✦</span>
            <p className="promise-title">Luxury, Handled with Care</p>
            <p className="promise-desc">
              Every order is treated as a singular object of value. Considered packaging,
              discreet handling, an unwavering white-glove standard.
            </p>
          </div>
          <div className="promise-item reveal reveal-delay-2">
            <span className="promise-icon">◉</span>
            <p className="promise-title">Zero-Emission by Design</p>
            <p className="promise-desc">
              A fully electric, intelligently dispatched fleet. Fast, silent, and carbon-free —
              because the future of luxury cannot cost the planet.
            </p>
          </div>
          <div className="promise-item reveal reveal-delay-3">
            <span className="promise-icon">◈</span>
            <p className="promise-title">Real-Time Visibility</p>
            <p className="promise-desc">
              Live, end-to-end intelligence from dispatch to doorstep. Know precisely where
              your order is, at every moment of its journey.
            </p>
          </div>
        </div>
      </div>

      {/* ─── How It Works ─── */}
      <section id="how">
        <div className="how-layout">
          <div>
            <p className="section-label reveal">The Intelligence</p>
            <h2 className="section-headline reveal reveal-delay-1">
              Engineered to feel <em>effortless.</em>
            </h2>
            <p className="section-body reveal reveal-delay-2">
              Behind every delivery is a logistics intelligence that thinks ahead. We collapse
              the distance between desire and arrival into a single, seamless motion.
            </p>
            <div className="steps">
              <div className="step reveal reveal-delay-1">
                <div className="step-num">01</div>
                <div className="step-content">
                  <h3>Desire is expressed</h3>
                  <p>
                    A customer selects Booster at checkout on a partner's storefront. In that
                    instant, our network is already calculating the optimal path to their door.
                  </p>
                </div>
              </div>
              <div className="step reveal reveal-delay-2">
                <div className="step-num">02</div>
                <div className="step-content">
                  <h3>Intelligence orchestrates</h3>
                  <p>
                    Our routing engine activates the nearest available capacity and choreographs
                    every step in real time — adapting continuously to the city as it moves.
                  </p>
                </div>
              </div>
              <div className="step reveal reveal-delay-3">
                <div className="step-num">03</div>
                <div className="step-content">
                  <h3>Delivered, immaculately</h3>
                  <p>
                    A zero-emission courier completes the final leg with discretion and care.
                    The order arrives in hand — typically in under an hour.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <div className="route-card">
              <div className="route-header">
                <span className="route-label">Live Orchestration</span>
                <span className="route-badge">En Route</span>
              </div>
              <div className="route-path">
                <div className="route-node">
                  <div className="node-line-wrap">
                    <div className="node-dot store"></div>
                    <div className="node-connector"></div>
                  </div>
                  <div className="node-info">
                    <p className="node-title">Origin Node · Knightsbridge</p>
                    <p className="node-detail">Dispatched · 2 min ago</p>
                  </div>
                </div>
                <div className="route-node">
                  <div className="node-line-wrap">
                    <div className="node-dot rider"></div>
                    <div className="node-connector"></div>
                  </div>
                  <div className="node-info">
                    <p className="node-title">Courier · Unit 04</p>
                    <p className="node-detail">Sloane Street → Belgravia</p>
                  </div>
                </div>
                <div className="route-node">
                  <div className="node-line-wrap">
                    <div className="node-dot home"></div>
                  </div>
                  <div className="node-info">
                    <p className="node-title">Destination</p>
                    <p className="node-detail">Belgravia Square</p>
                  </div>
                </div>
              </div>
              <div className="route-footer">
                <span className="eta-label">Estimated Arrival</span>
                <span className="eta-value">14 min</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Retailers ─── */}
      <section id="retailers">
        <div className="retailers-layout">
          <div>
            <p className="section-label reveal">For Maisons &amp; Retailers</p>
            <h2 className="section-headline reveal reveal-delay-1">
              Your brand, delivered <em>at the speed of intent.</em>
            </h2>
            <p className="section-body reveal reveal-delay-2">
              Booster gives the world's most discerning brands an entirely new dimension:
              instant, intelligent fulfilment that matches the standard of the product itself.
            </p>
            <div className="benefit-list">
              <div className="benefit reveal reveal-delay-1">
                <div className="benefit-icon">✓</div>
                <div className="benefit-text">
                  <h4>Conversion, Elevated</h4>
                  <p>
                    Offering near-instant luxury delivery reduces abandonment and turns intent
                    into purchase — lifting conversion by up to 24%.
                  </p>
                </div>
              </div>
              <div className="benefit reveal reveal-delay-2">
                <div className="benefit-icon">✓</div>
                <div className="benefit-text">
                  <h4>One Intelligent API</h4>
                  <p>
                    A single integration for Shopify Plus, Salesforce Commerce Cloud, and
                    bespoke platforms. Live in days, not quarters.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="retailer-visual reveal reveal-delay-2">
            <div className="ret-card">
              <div className="ret-card-icon">✦</div>
              <p className="ret-card-name">Flagship Maisons</p>
              <p className="ret-card-type">Mayfair · Knightsbridge</p>
            </div>
            <div className="ret-card">
              <div className="ret-card-icon">◈</div>
              <p className="ret-card-name">Fine Jewellers</p>
              <p className="ret-card-type">New Bond Street</p>
            </div>
            <div className="ret-card">
              <div className="ret-card-icon">◉</div>
              <p className="ret-card-name">Couture Houses</p>
              <p className="ret-card-type">Regent Street</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Proof ─── */}
      <div id="proof">
        <p className="proof-label">Built for London's Most Discerning Brands</p>
        <div className="proof-marquee">
          <span className="proof-chip">Mayfair Maisons</span>
          <span className="proof-chip">Savile Row Ateliers</span>
          <span className="proof-chip">Knightsbridge Houses</span>
          <span className="proof-chip">Sloane Street Designers</span>
        </div>
      </div>

      {/* ─── Dispatch ─── */}
      <section id="dispatch">
        <div className="dispatch-layout">
          <div>
            <p className="section-label reveal">Merchant Console</p>
            <h2 className="section-headline reveal reveal-delay-1">
              Command the network <em>on demand.</em>
            </h2>
            <p className="section-body reveal reveal-delay-2">
              For partners who need a delivery dispatched this instant. Open the console,
              define the parameters, and let our intelligence handle the rest.
            </p>
            <div className="zone-map reveal reveal-delay-3">
              <p className="zone-map-title">Network Status</p>
              <div className="zone-list">
                <div className="zone-item">
                  <div className="zone-item-left">
                    <span className="zone-pill">Z1</span>
                    <span className="zone-name">Mayfair · Soho · Core Central</span>
                  </div>
                  <span className="zone-eta">&lt; 45m ETA</span>
                </div>
                <div className="zone-item">
                  <div className="zone-item-left">
                    <span className="zone-pill">Z2</span>
                    <span className="zone-name">Kensington · Chelsea · Belgravia</span>
                  </div>
                  <span className="zone-eta">&lt; 60m ETA</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dispatch-form-card reveal reveal-delay-2">
            <p className="form-title">Dispatch Console</p>
            <p className="form-subtitle">Verified partner access</p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="pickup">Origin</label>
                  <select id="pickup">
                    <option>Select origin node</option>
                    <option>Mayfair</option>
                    <option>Knightsbridge</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="tier">Service Tier</label>
                  <select id="tier">
                    <option>Signature Delivery</option>
                    <option>White-Glove · High Value</option>
                  </select>
                </div>
                <div className="form-group full">
                  <label htmlFor="address">Destination</label>
                  <input
                    type="text"
                    id="address"
                    placeholder="London postcode or precise drop location"
                  />
                </div>
                <div className="form-group full">
                  <label htmlFor="notes">Handling Notes</label>
                  <textarea
                    id="notes"
                    placeholder="Discreet handover, signature requirements, special care..."
                  ></textarea>
                </div>
              </div>
              <button className="form-submit" type="submit">Dispatch Now</button>
            </form>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section id="cta">
        <div className="max-width-wrap">
          <h2 className="cta-headline">
            The future of luxury <em>moves faster.</em>
          </h2>
          <p className="cta-sub">
            Join the brands defining the next era of commerce — where intelligence and
            craftsmanship arrive together, in minutes.
          </p>
          <div className="hero-actions">
            <a href="#dispatch" className="btn-cta-primary">Request Access</a>
            <a href="#retailers" className="btn-cta-secondary">Speak with our team</a>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer>
        <a className="footer-logo" href="#">Booster</a>
        <ul className="footer-links">
          <li><a href="#">Privacy Framework</a></li>
          <li><a href="#">Merchant System Status</a></li>
          <li><a href="#">API Documentation</a></li>
        </ul>
        <p className="footer-copy">&copy; 2026 Booster Ecosystems Corp. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Dashboard;
