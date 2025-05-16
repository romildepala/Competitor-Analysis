const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="container max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/lovable-uploads/fce5ec2f-a6af-4890-b209-b249cff5a0b3.png" 
                alt="Spyer Logo" 
                className="h-6 w-6"
              />
              <div className="text-2xl font-bold text-brand-blue">Spyer</div>
            </div>
            <p className="text-gray-600 mb-4">
              The comprehensive company monitoring platform for smarter business intelligence.
            </p>
          </div>
          
          <div className="text-right">
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3 text-gray-600">
              <li><a href="#features" className="hover:text-brand-blue">Features</a></li>
              <li><a href="#pricing" className="hover:text-brand-blue">Pricing</a></li>
              <li><a href="#" className="hover:text-brand-blue">API</a></li>
              <li><a href="#" className="hover:text-brand-blue">Integrations</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex justify-center md:justify-start">
          <div className="text-gray-500">
            &copy; {new Date().getFullYear()} Spyer. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
