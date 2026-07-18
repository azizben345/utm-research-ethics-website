import React from 'react';

export default function AnimalTabCare({ data, updateCare }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* SECTION 3: ANIMAL CARE AND NUTRITION */}
      <section>
        <div style={{ borderBottom: '2px solid var(--primary, #2563eb)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', textTransform: 'uppercase' }}>Section 3: Animal Care, Feed & Environment</h3>
        </div>

        {/* 3.1 Feed & 3.2 Drinking Water */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          
          {/* Feed */}
          <div style={{ backgroundColor: '#f9fafb', padding: '1.25rem', borderRadius: '6px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary, #2563eb)' }}>3.1 Animal Feed *</span>
            
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>3.1.1 Source & Origin</span>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.2rem', fontSize: '0.8rem' }}>
                <label><input type="radio" name="fSrc" checked={data.feedSource === 'Registered supplier'} onChange={() => updateCare('feedSource', 'Registered supplier')} /> Registered Supplier</label>
                <label><input type="radio" name="fSrc" checked={data.feedSource === 'Others'} onChange={() => updateCare('feedSource', 'Others')} /> Others</label>
                <span style={{ margin: '0 0.5rem', color: '#d1d5db' }}>|</span>
                <label><input type="radio" name="fOrig" checked={data.feedOrigin === 'Local'} onChange={() => updateCare('feedOrigin', 'Local')} /> Local</label>
                <label><input type="radio" name="fOrig" checked={data.feedOrigin === 'Imported'} onChange={() => updateCare('feedOrigin', 'Imported')} /> Imported</label>
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Type of Feed Material</span>
              <select value={data.feedType || ''} onChange={e => updateCare('feedType', e.target.value)} style={{ width: '100%', padding: '0.4rem', marginTop: '0.2rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db' }}>
                <option value="">Select feed type...</option>
                <option value="Cereal (pellet, loose)">Cereal (pellet, loose)</option>
                <option value="Agricultural Product">Agricultural Product (vegetables, fruits)</option>
                <option value="Agricultural by-products">Agricultural by-products (yam stem, banana stems)</option>
                <option value="Animal based-product">Animal based-product (meat, chicken)</option>
                <option value="Other feed materials">Other feed materials</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600 }}>Manufacturer Name</label>
                <input type="text" placeholder="e.g., Gold Coin" value={data.feedManufacturer || ''} onChange={e => updateCare('feedManufacturer', e.target.value)} style={{ width: '100%', padding: '0.35rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600 }}>3.1.2 Feeding Frequency</label>
                <select value={data.feedingFreq || ''} onChange={e => updateCare('feedingFreq', e.target.value)} style={{ width: '100%', padding: '0.35rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db' }}>
                  <option value="Once daily">Once daily</option>
                  <option value="Twice weekly">Twice weekly</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Ad libitum">Ad libitum (Free access)</option>
                </select>
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>3.1.3 Special Diet Provided?</span>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.2rem', fontSize: '0.8rem' }}>
                <label><input type="radio" name="sDiet" checked={data.specialDiet === 'No'} onChange={() => updateCare('specialDiet', 'No')} /> No</label>
                <label><input type="radio" name="sDiet" checked={data.specialDiet === 'Yes'} onChange={() => updateCare('specialDiet', 'Yes')} /> Yes</label>
              </div>
              {data.specialDiet === 'Yes' && (
                <input type="text" placeholder="Specify special dietary composition..." value={data.specialDietDetails || ''} onChange={e => updateCare('specialDietDetails', e.target.value)} style={{ width: '100%', padding: '0.35rem', marginTop: '0.3rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db' }} />
              )}
            </div>
          </div>

          {/* Water */}
          <div style={{ backgroundColor: '#f9fafb', padding: '1.25rem', borderRadius: '6px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary, #2563eb)' }}>3.2 Drinking Water Supply *</span>
            
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>3.2.1 Water Source</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.3rem', marginTop: '0.2rem', fontSize: '0.8rem' }}>
                <label><input type="radio" name="wSrc" checked={data.waterSource === 'Tap water'} onChange={() => updateCare('waterSource', 'Tap water')} /> Tap water</label>
                <label><input type="radio" name="wSrc" checked={data.waterSource === 'RO water'} onChange={() => updateCare('waterSource', 'RO water')} /> RO water</label>
                <label><input type="radio" name="wSrc" checked={data.waterSource === 'Filtered'} onChange={() => updateCare('waterSource', 'Filtered')} /> Filtered</label>
                <label><input type="radio" name="wSrc" checked={data.waterSource === 'Others'} onChange={() => updateCare('waterSource', 'Others')} /> Others</label>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600 }}>3.2.2 Frequency of Dispensing Water</label>
              <select value={data.waterDispenseFreq || 'Ad libitum'} onChange={e => updateCare('waterDispenseFreq', e.target.value)} style={{ width: '100%', padding: '0.4rem', marginTop: '0.2rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db' }}>
                <option value="Ad libitum">Ad libitum (Free access)</option>
                <option value="Once daily">Once daily</option>
                <option value="Twice weekly">Twice weekly</option>
                <option value="Weekly">Weekly</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600 }}>3.2.3 Frequency of Changing/Cleaning Bottles</label>
              <select value={data.bottleCleanFreq || 'Twice weekly'} onChange={e => updateCare('bottleCleanFreq', e.target.value)} style={{ width: '100%', padding: '0.4rem', marginTop: '0.2rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db' }}>
                <option value="Once daily">Once daily</option>
                <option value="Twice weekly">Twice weekly</option>
                <option value="Weekly">Weekly</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3.3 Bedding & 3.4-3.5 Sanitation */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          
          <div style={{ backgroundColor: '#f9fafb', padding: '1.25rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
            <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>3.3 Types of Bedding & Changing Schedule *</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
              <label><input type="radio" name="bed" checked={data.beddingType === 'Autoclaved wood shavings'} onChange={() => updateCare('beddingType', 'Autoclaved wood shavings')} /> Autoclaved wood shavings</label>
              <label><input type="radio" name="bed" checked={data.beddingType === 'Non-autoclaved wood shavings'} onChange={() => updateCare('beddingType', 'Non-autoclaved wood shavings')} /> Non-autoclaved wood shavings</label>
              <label><input type="radio" name="bed" checked={data.beddingType === 'Newspaper'} onChange={() => updateCare('beddingType', 'Newspaper')} /> Newspaper</label>
              <label><input type="radio" name="bed" checked={data.beddingType === 'Tissue paper'} onChange={() => updateCare('beddingType', 'Tissue paper')} /> Tissue paper</label>
              <label><input type="radio" name="bed" checked={data.beddingType === 'Filter paper'} onChange={() => updateCare('beddingType', 'Filter paper')} /> Filter paper</label>
              <label><input type="radio" name="bed" checked={data.beddingType === 'Others'} onChange={() => updateCare('beddingType', 'Others')} /> Others</label>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>3.3.2 Frequency of Changing Bedding</span>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.2rem', fontSize: '0.8rem' }}>
                <label><input type="radio" name="bedFreq" checked={data.beddingFreq === 'Once daily'} onChange={() => updateCare('beddingFreq', 'Once daily')} /> Once daily</label>
                <label><input type="radio" name="bedFreq" checked={data.beddingFreq === 'Twice weekly'} onChange={() => updateCare('beddingFreq', 'Twice weekly')} /> Twice weekly</label>
                <label><input type="radio" name="bedFreq" checked={data.beddingFreq === 'Weekly'} onChange={() => updateCare('beddingFreq', 'Weekly')} /> Weekly</label>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: '#f9fafb', padding: '1.25rem', borderRadius: '6px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700 }}>3.4 Frequency of Cleaning Cage *</span>
              <select value={data.cageCleanFreq || 'Every two days'} onChange={e => updateCare('cageCleanFreq', e.target.value)} style={{ width: '100%', padding: '0.4rem', marginTop: '0.2rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db' }}>
                <option value="Twice daily">Twice daily</option>
                <option value="Once daily">Once daily</option>
                <option value="Every two days">Every two days</option>
                <option value="Weekly">Weekly</option>
              </select>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700 }}>3.5 Frequency of Cleaning Litter Tray (if applicable) *</span>
              <select value={data.litterCleanFreq || 'Once daily'} onChange={e => updateCare('litterCleanFreq', e.target.value)} style={{ width: '100%', padding: '0.4rem', marginTop: '0.2rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db' }}>
                <option value="Once daily">Once daily</option>
                <option value="Twice weekly">Twice weekly</option>
                <option value="Weekly">Weekly</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3.6 - 3.8 Environmental Controls */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', backgroundColor: '#f9fafb', padding: '1.25rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
          <div>
            <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>3.6 Animal Room Temperature *</span>
            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.2rem' }}><input type="radio" name="temp" checked={data.tempType === 'Ambient'} onChange={() => updateCare('tempType', 'Ambient')} /> Ambient room temperature</label>
            <label style={{ display: 'block', fontSize: '0.8rem' }}><input type="radio" name="temp" checked={data.tempType === 'Air-conditioned'} onChange={() => updateCare('tempType', 'Air-conditioned')} /> Air-conditioned room</label>
            {data.tempType === 'Air-conditioned' && (
              <input type="text" placeholder="Specify temp e.g. 22±2°C" value={data.roomTemp || ''} onChange={e => updateCare('roomTemp', e.target.value)} style={{ width: '100%', padding: '0.3rem', marginTop: '0.3rem', fontSize: '0.75rem', borderRadius: '3px', border: '1px solid #d1d5db' }} />
            )}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>3.7 Temperature Regulating Device *</label>
            <input type="text" placeholder="e.g., Central HVAC thermostat, split-unit AC..." value={data.tempDevice || ''} onChange={e => updateCare('tempDevice', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '3px', border: '1px solid #d1d5db', fontSize: '0.8rem' }} />
          </div>

          <div>
            <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>3.8 Lighting Cycle *</span>
            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.2rem' }}><input type="radio" name="light" checked={data.lightCycle === '12h light/12h dark'} onChange={() => updateCare('lightCycle', '12h light/12h dark')} /> 12h light / 12h dark</label>
            <label style={{ display: 'block', fontSize: '0.8rem' }}><input type="radio" name="light" checked={data.lightCycle === 'Others'} onChange={() => updateCare('lightCycle', 'Others')} /> Others</label>
            {data.lightCycle === 'Others' && (
              <input type="text" placeholder="Specify lighting schedule..." value={data.otherLight || ''} onChange={e => updateCare('otherLight', e.target.value)} style={{ width: '100%', padding: '0.3rem', marginTop: '0.3rem', fontSize: '0.75rem', borderRadius: '3px', border: '1px solid #d1d5db' }} />
            )}
          </div>
        </div>

      </section>

    </div>
  );
}