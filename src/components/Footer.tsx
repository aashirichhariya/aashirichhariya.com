import React from 'react';
import { profile } from '../content';

const Footer: React.FC = () => (
  <footer className="footer">
    <div>© {profile.name} · {new Date().getFullYear()}</div>
    <div className="set-in">
      Set in <em>Fraunces</em> &amp; <em>DM Sans.</em> Designed and written end-to-end by {profile.name}.
    </div>
    <div>Edition II · v.3</div>
  </footer>
);

export default Footer;
