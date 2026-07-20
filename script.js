// อัตราส่วนเมื่อเทียบกับ 1 เมตร (Meter)
const factorsInMeter = {
    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.344
};

// อ้างอิง Element จาก HTML
const fromValueInput = document.getElementById('fromValue');
const toValueInput = document.getElementById('toValue');
const fromUnitSelect = document.getElementById('fromUnit');
const toUnitSelect = document.getElementById('toUnit');
const swapBtn = document.getElementById('swapBtn');
const formulaText = document.getElementById('formulaText');

// ฟังก์ชันหลักในการคำนวณแปลงหน่วย
function calculateConversion() {
    const value = parseFloat(fromValueInput.value);
    
    // ตรวจสอบดักกรณีช่องกรอกข้อมูลว่างเปล่า หรือไม่ใช่ตัวเลข
    if (isNaN(value)) {
        toValueInput.value = '';
        return;
    }

    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;

    // Step 1: แปลงจากหน่วยต้นทาง -> เมตร (Meter)
    const valueInMeter = value * factorsInMeter[fromUnit];

    // Step 2: แปลงจากเมตร -> หน่วยปลายทาง
    const result = valueInMeter / factorsInMeter[toUnit];

    // Step 3: แสดงผลลัพธ์ (คุมทศนิยมให้เหมาะสมสูงสุด 6 ตำแหน่ง และตัด 0 ตัวท้ายที่ไม่มีค่า)
    toValueInput.value = parseFloat(result.toFixed(6));

    // อัปเดตข้อมูลสูตรในกล่องข้อความด้านล่าง
    updateFormula(fromUnit, toUnit);
}

// ฟังก์ชันแสดงความสัมพันธ์ของหน่วยย่อย
function updateFormula(from, to) {
    const baseline = 1 * factorsInMeter[from];
    const convertedBaseline = baseline / factorsInMeter[to];
    formulaText.textContent = `1 ${from} = ${parseFloat(convertedBaseline.toFixed(6))} ${to}`;
}

// ฟังก์ชันสลับหน่วยต้นทางและปลายทาง
function swapUnits() {
    const tempUnit = fromUnitSelect.value;
    fromUnitSelect.value = toUnitSelect.value;
    toUnitSelect.value = tempUnit;
    
    // หลังจากสลับหน่วย ให้ทำการคำนวณใหม่ทันที
    calculateConversion();
}

// ผูก Event Listener เพื่อให้เกิดการคำนวณแบบ Real-time (ไม่ต้องคอยกดปุ่มส่งข้อมูล)
fromValueInput.addEventListener('input', calculateConversion);
fromUnitSelect.addEventListener('change', calculateConversion);
toUnitSelect.addEventListener('change', calculateConversion);
swapBtn.addEventListener('click', swapUnits);

// เรียกทำงานครั้งแรกตอนเปิดหน้าเว็บเพื่อแสดงค่าเริ่มต้น
calculateConversion();