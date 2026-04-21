export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, phone, archetype, time } = req.body;

  try {
    const response = await fetch(
      'https://api.airtable.com/v0/appjZV4aYRBi4FPyz/tblf5eFZ7hIvw2GgH',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.AIRTABLE_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            'Full Name': name,
            'Phone': phone,
            'Archetype': archetype,
            'Lead Status': 'Booked',
            'Email': time,
          }
        })
      }
    );

    const data = await response.json();
    if (data.error) {
      console.error('Airtable error:', data.error);
      return res.status(500).json({ error: data.error });
    }
    return res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
