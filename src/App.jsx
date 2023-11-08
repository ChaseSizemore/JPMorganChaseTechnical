import React, { useState } from 'react';
import data from './data.json';
import './App.css';

function App() {
  const [tree] = useState(data.root); //The root of the tree
  const [openNodes, setOpenNodes] = useState({}); //state for the open nodes

  //Toggles if the folder is open or closed with an object structure
  const handleClick = (nodeName) => {
    setOpenNodes((prevOpenNodes) => ({
      ...prevOpenNodes,
      [nodeName]: !prevOpenNodes[nodeName],
    }));
  };

  //recursive function to render tree
  const renderTree = (node, name, level = 0) => {
    if (node && node.type === 'folder') {
      const txtFiles = openNodes[name]
        ? node.child
            .filter((childName) => childName.endsWith('.txt'))
            .join(', ')
        : '';
      return (
        <>
          <tr>
            <td style={{ paddingLeft: `${10 * level}px` }} onClick={() => handleClick(name)}>
              <span className="folder-icon">&#128194;</span>
              {name}
            </td>
            <td>{txtFiles}</td>
          </tr>
          {openNodes[name] &&
            node.child
              .filter((childName) => !childName.endsWith('.txt'))
              .map((childName) => (
                <React.Fragment key={childName}>
                  {data[childName] ? (
                    renderTree(data[childName], childName, level + 1)
                  ) : (
                    <tr key={childName}>
                      <td style={{ paddingLeft: `${10 * level + 10}px` }}>
                        <span className="folder-icon">&#128194;</span>
                        {childName}
                      </td>
                      <td></td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
        </>
      );
    } else {
      return <></>;
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>{renderTree(tree, 'root')}</tbody>
    </table>
  );
}
export default App;
