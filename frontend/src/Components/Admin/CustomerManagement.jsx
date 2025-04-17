import React, { useState } from 'react';

function CustomerManagement() {
  // This would be fetched from an API in a real application
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '555-123-4567', visits: 12, lastVisit: '2025-03-20' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '555-987-6543', visits: 8, lastVisit: '2025-03-22' },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '555-555-5555', visits: 5, lastVisit: '2025-03-15' },
    { id: 4, name: 'Alice Williams', email: 'alice.williams@example.com', phone: '555-222-3333', visits: 20, lastVisit: '2025-03-23' }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '' });
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email) {
      alert('Name and email are required');
      return;
    }

    setCustomers([
      ...customers,
      {
        id: customers.length + 1,
        ...newCustomer,
        visits: 0,
        lastVisit: new Date().toISOString().split('T')[0]
      }
    ]);
    setNewCustomer({ name: '', email: '', phone: '' });
    setShowAddForm(false);
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer({ ...customer });
  };

  const handleUpdateCustomer = () => {
    setCustomers(customers.map(customer => 
      customer.id === editingCustomer.id ? editingCustomer : customer
    ));
    setEditingCustomer(null);
  };

  const handleDeleteCustomer = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(customer => customer.id !== id));
    }
  };

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Customer Management</h1>
        <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Cancel' : 'Add New Customer'}
        </button>
      </div>

      <div className="card" style={{ marginBottom: '20px' }}>
        <input
          type="text"
          className="form-control"
          placeholder="Search customers by name, email or phone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {showAddForm && (
        <div className="card" style={{ marginBottom: '20px' }}>
          <h2>Add New Customer</h2>
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              className="form-control"
              value={newCustomer.name}
              onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              className="form-control"
              value={newCustomer.email}
              onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              className="form-control"
              value={newCustomer.phone}
              onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
            />
          </div>
          <button className="btn btn-success" onClick={handleAddCustomer}>Add Customer</button>
        </div>
      )}

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Visits</th>
              <th>Last Visit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(customer => (
              <tr key={customer.id}>
                {editingCustomer && editingCustomer.id === customer.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={editingCustomer.name}
                        onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        className="form-control"
                        value={editingCustomer.email}
                        onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        type="tel"
                        className="form-control"
                        value={editingCustomer.phone}
                        onChange={(e) => setEditingCustomer({ ...editingCustomer, phone: e.target.value })}
                      />
                    </td>
                    <td>{customer.visits}</td>
                    <td>{new Date(customer.lastVisit).toLocaleDateString()}</td>
                    <td>
                      <button className="btn btn-success" style={{ marginRight: '5px' }} onClick={handleUpdateCustomer}>Save</button>
                      <button className="btn btn-danger" onClick={() => setEditingCustomer(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.visits}</td>
                    <td>{new Date(customer.lastVisit).toLocaleDateString()}</td>
                    <td>
                      <button className="btn btn-primary" style={{ marginRight: '5px' }} onClick={() => setSelectedCustomer(customer)}>View</button>
                      <button className="btn btn-primary" style={{ marginRight: '5px' }} onClick={() => handleEditCustomer(customer)}>Edit</button>
                      <button className="btn btn-danger" onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCustomer && (
        <div className="modal" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '80%',
            maxWidth: '600px',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2>Customer Details</h2>
              <button 
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}
                onClick={() => setSelectedCustomer(null)}
              >
                ×
              </button>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <h3>{selectedCustomer.name}</h3>
              <p><strong>Email:</strong> {selectedCustomer.email}</p>
              <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
              <p><strong>Total Visits:</strong> {selectedCustomer.visits}</p>
              <p><strong>Last Visit:</strong> {new Date(selectedCustomer.lastVisit).toLocaleDateString()}</p>
            </div>

            <div style={{ marginTop: '20px' }}>
              <h3>Order History</h3>
              <p>Coming soon: Customer order history</p>
            </div>
            
            <div style={{ marginTop: '20px' }}>
              <h3>Loyalty Program</h3>
              <p>Coming soon: Loyalty program management</p>
            </div>
            
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button className="btn btn-primary" onClick={() => setSelectedCustomer(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerManagement;