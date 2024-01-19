import { FC, useEffect, useState } from 'react';
import Home from './page/Home';
import D2C from './page/D2C';
const App: FC = () => {
  const [node, setNode] = useState<any>(null);
  const [showHome, setShowHome] = useState(true);
  useEffect(() => {
    window.onmessage = (event) => {
      const { selection } = event.data.pluginMessage;
      console.log('react', selection);
      setNode(selection);
    };

    console.log(history)
    console.log(location)
  }, []);

  return (
    <div className="flex flex-col w-370 h-full pt-8 bg-gray-50">
      {showHome ? (
        <Home setShowHome={setShowHome} />
      ) : (
        <D2C node={node} setShowHome={setShowHome} />
      )}
    </div>
  );
};

export default App;
