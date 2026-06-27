import { Utensils } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Utensils className="h-6 w-6 text-primary" />
              <span className="ml-2 text-xl font-bold text-gray-900">FoodCare</span>
            </div>
            <p className="text-gray-700 max-w-sm font-medium">
              Making a difference one meal at a time. Connecting donors with organizations to ensure no food goes to waste.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-700 text-sm font-medium">
              <li><a href="/donations" className="hover:text-primary transition-colors">Browse Food</a></li>
              <li><a href="/signup" className="hover:text-primary transition-colors">Join as Donor</a></li>
              <li><a href="/signup" className="hover:text-primary transition-colors">Join as NGO</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-700 text-sm font-medium">
              <li>support@foodcare.org</li>
              <li>+1 (555) 000-0000</li>
              <li>123 Green Way, Eco City</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-12 pt-8 text-center text-gray-400 text-xs">
          <p>© {new Date().getFullYear()} FoodCare. All rights reserved. Built with ❤️ for a better planet.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
