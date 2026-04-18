import { FileText, User, Calendar, Shield, Receipt as ReceiptIcon, CheckCircle2 } from 'lucide-react';
import Head from 'next/head';

// --- Types ---
interface Client {
  firstName: string;
  lastName: string;
  idNumber: string;
  title: string;
  streetAddress: string;
  city: string;
  phone: string;
  email?: string;
  dateOfBirth: string;
  signatureImageUrl?: string;
}

interface Policy {
  policyNumber: string;
  planType: string;
  policyType: string;
  status: string;
  premiumAmount: number;
  paymentFrequency: string;
  inceptionDate: string;
  renewalDate: string;
  waitingPeriodEnd: string;
  dependents?: Record<string, {
    firstName: string;
    lastName: string;
    relationship: string;
    dateOfBirth: string;
    idNumber?: string;
  }>;
  beneficiaries?: Record<string, {
    firstName: string;
    lastName: string;
    relationship: string;
    idNumber?: string;
    phone?: string;
  }>;
  signatureImageUrl?: string;
}

interface Payment {
  amount: number;
  date: string;
  method: string;
  reference?: string;
  receiptNumber?: string;
  monthsCovered?: string;
  status?: string;
  signatureImageUrl?: string;
}

interface Claim {
  claimType: string;
  claimDate: string;
  status: string;
  amount?: number;
  description?: string;
  deceasedName?: string;
  deceasedID?: string;
  dateOfDeath?: string;
  burialPlace?: string;
}

// --- Helper Components ---

const PrintFooter = () => (
  <div className="mt-auto pt-4 text-center border-t border-gray-100 print:border-none print:pt-4">
    <p className="text-[#1e3a8a] font-bold text-[10px] tracking-[0.2em] uppercase">
      ROYALTY FUNERAL SERVICES – A DIGNIFIED SEND-OFF
    </p>
  </div>
);

const DocumentHeader = () => (
  <div className="flex justify-between items-start mb-12">
    <img src="/images/logo.png" alt="Royalty Funeral Services" className="h-14 object-contain" />
    <div className="text-right text-[10px] text-gray-500 leading-tight">
      <p>Stand 15383 Khami Road</p>
      <p>Kelvin North, Bulawayo</p>
      <p>Zimbabwe</p>
      <p>+263 71 787 4750</p>
    </div>
  </div>
);

const PageContainer = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white p-6 md:p-12 print:p-0 relative flex flex-col font-sans text-gray-900 ${className}`}>
    {children}
    <div className="mt-auto">
      <PrintFooter />
    </div>
  </div>
);

// --- Main Document Components ---

function amountToWords(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  const dollars = Math.floor(rounded);
  const cents = Math.round((rounded - dollars) * 100);

  const units = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

  function convertSmall(n: number): string {
    if (n < 20) return units[n];
    return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? "-" + units[n % 10] : "");
  }

  function convertHundreds(n: number): string {
    if (n >= 100) {
      return units[Math.floor(n / 100)] + " hundred" + (n % 100 !== 0 ? " and " + convertSmall(n % 100) : "");
    }
    return convertSmall(n);
  }

  let result = "";
  if (dollars === 0) result = "zero dollars";
  else {
    if (dollars >= 1000) {
      result += convertHundreds(Math.floor(dollars / 1000)) + " thousand ";
    }
    result += convertHundreds(dollars % 1000) + " dollar" + (dollars !== 1 ? "s" : "");
  }

  if (cents > 0) {
    result += " and " + convertSmall(cents) + " cent" + (cents !== 1 ? "s" : "");
  }
  
  return result.charAt(0).toUpperCase() + result.slice(1) + " only.";
}

export const PolicyDocument = ({ client, policy, adminSignature }: { client: Client; policy: Policy; adminSignature?: string }) => {
  const dependentsList = policy.dependents ? Object.values(policy.dependents) : [];
  
  // Calculate specific dates
  const inception = new Date(policy.inceptionDate);
  const coverDate = new Date(inception);
  coverDate.setMonth(coverDate.getMonth() + 3);
  
  const paidUpDate = new Date(inception);
  paidUpDate.setFullYear(paidUpDate.getFullYear() + 20);

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-ZW', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  return (
    <div className="space-y-0">
      {/* Page 1: Acceptance Letter */}
      <PageContainer className="print:break-after-page">
        <DocumentHeader />
        
        <div className="mb-4 text-xs">
          <p className="font-bold">{client.title} {client.firstName} {client.lastName}</p>
          <p>{client.streetAddress}</p>
          <p>{client.city}</p>
        </div>

        <h1 className="text-sm font-bold uppercase mb-4">
          Ref: LETTER OF ACCEPTANCE OF FUNERAL POLICY APPLICATION
        </h1>

        <div className="space-y-6 text-sm text-justify leading-relaxed">
          <p>
            We would like to take this opportunity to inform you that your application for the funeral service cover was successful. Your policy number is <strong>{policy.policyNumber}</strong>. Please examine the document carefully and let us know of any error or omission and arrangements will be done to get the same rectified. You have the right to review your Policy within 30 days of the date of this letter. Should you wish to exercise this option please write to Royalty Funeral Services Suite 309 Sterling House, between L. Takawira and 8th Avenue along J. Moyo Street Bulawayo.
          </p>
          <p>
            The Policy Document and attached Policy terms and conditions are important contractual documents. We trust you will keep them in a secure place.
          </p>
        </div>

        <div className="mt-12 space-y-12">
          <div className="text-sm">
            <p>Yours faithfully,</p>
            {adminSignature || policy.signatureImageUrl ? (
              <img src={adminSignature || policy.signatureImageUrl} alt="Administrator Signature" className="h-10 w-auto object-contain mt-2 mb-1" />
            ) : (
              <div className="h-16 w-48 border-b border-gray-300 mt-4 mb-2"></div>
            )}
            <p className="font-bold">The Administrator</p>
          </div>
        </div>
      </PageContainer>

      {/* Page 2: Policy Schedule */}
      <PageContainer className="print:break-after-page">
        <DocumentHeader />
        
        <h2 className="text-xl font-bold uppercase mb-6 underline">POLICY HOLDER DETAILS</h2>

        <table className="w-full text-sm border-collapse border border-gray-900 mb-8 print:break-inside-avoid">
          <tbody>
            {[
              ['Policy number:', policy.policyNumber],
              ['Full Name:', `${client.title} ${client.firstName} ${client.lastName}`],
              ['Date of Birth:', formatDate(client.dateOfBirth)],
              ['ID Number:', client.idNumber],
              ['Contact Number:', client.phone],
              ['Address:', `${client.streetAddress}, ${client.city}`],
              ['Premium:', `$${policy.premiumAmount.toFixed(2)} USD`],
              ['Plan Level:', `Royalty ${policy.planType} – ${policy.policyType}`],
              ['Premium Mode:', 'Monthly'],
              ['Review Date:', 'Annually, automatically'],
              ['Commencement Date:', formatDate(policy.inceptionDate)],
              ['Cover Date:', formatDate(coverDate)],
              ['Term of Contract:', '20 years'],
              ['Paid up date:', formatDate(paidUpDate)],
              ['Financial Advisor:', 'B. Sibanda'],
            ].map(([label, value], i) => (
              <tr key={i} className="border-b border-gray-900">
                <td className="p-2 border-r border-gray-900 font-bold w-1/3 text-gray-900">{label}</td>
                <td className="p-2 text-gray-800">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {dependentsList.length > 0 && (
          <div className="mb-8">
            <h3 className="font-bold uppercase mb-2 text-sm">COVERED DEPENDENTS</h3>
            <table className="w-full text-sm border-collapse border border-gray-900 print:break-inside-avoid">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-900">
                  <th className="p-2 border-r border-gray-900 text-left">Name</th>
                  <th className="p-2 border-r border-gray-900 text-left">Relation</th>
                  <th className="p-2 text-left">Date of Birth</th>
                </tr>
              </thead>
              <tbody>
                {dependentsList.map((dep, i) => (
                  <tr key={i} className="border-b border-gray-900">
                    <td className="p-2 border-r border-gray-900">{dep.firstName} {dep.lastName}</td>
                    <td className="p-2 border-r border-gray-900">{dep.relationship}</td>
                    <td className="p-2">{formatDate(dep.dateOfBirth)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {policy.beneficiaries && Object.keys(policy.beneficiaries).length > 0 && (
          <div className="mb-8">
            <h3 className="font-bold uppercase mb-2 text-sm">BENEFICIARIES</h3>
            <table className="w-full text-sm border-collapse border border-gray-900 print:break-inside-avoid">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-900">
                  <th className="p-2 border-r border-gray-900 text-left">Name</th>
                  <th className="p-2 border-r border-gray-900 text-left">Relation</th>
                  <th className="p-2 text-left">ID / Contact</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(policy.beneficiaries).map((ben, i) => (
                  <tr key={i} className="border-b border-gray-900">
                    <td className="p-2 border-r border-gray-900">{ben.firstName} {ben.lastName}</td>
                    <td className="p-2 border-r border-gray-900">{ben.relationship}</td>
                    <td className="p-2">{ben.idNumber || ben.phone || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mb-8">
          <h3 className="font-bold uppercase mb-3 text-sm underline">BENEFITS UPON DEATH:</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
            <li>Flat-Lid Casket</li>
            <li>Standard funeral services that includes; Mortuary services, Hearse, Body removal, Washing and Dressing, Body preservation, Gravesite equipment, Chairs, Tents, Lowering machines.</li>
            <li>US$150.00 OR equivalent worth of grocery hampers.</li>
            <li>US$15.00 worth of airtime.</li>
            <li>Transport for mourners.</li>
          </ul>
        </div>

        <div className="mt-auto flex justify-between items-end px-4 pt-12">
          <div className="text-center w-56">
            {adminSignature || policy.signatureImageUrl ? (
              <img src={adminSignature || policy.signatureImageUrl} alt="Administrator Signature" className="h-10 mx-auto object-contain mb-1" />
            ) : (
              <div className="border-b border-gray-900 h-10 mb-2"></div>
            )}
            <p className="text-[10px] uppercase font-bold">The Administrator</p>
          </div>
          <div className="text-center w-56">
            {client.signatureImageUrl ? (
              <img src={client.signatureImageUrl} alt="Policy Holder Signature" className="h-10 mx-auto object-contain mb-1" />
            ) : (
              <div className="border-b border-gray-900 h-10 mb-2"></div>
            )}
            <p className="text-[10px] uppercase font-bold">Policy Holder Signature</p>
          </div>
        </div>
      </PageContainer>

      {/* Page 3: Terms & Conditions */}
      <PageContainer>
        <DocumentHeader />
        
        <h2 className="text-center text-xl font-black uppercase mb-10 underline tracking-tight">Terms & Conditions</h2>

        <div className="space-y-4 text-[11px] leading-relaxed text-justify text-gray-800">
          <p>
            <span className="font-bold underline">1. Benefits Payable:</span> Funeral cover for the Principal Life is stated in the attached policy schedule. The benefit entitlement of each co-life is stated in the proposal form. Benefits payable and services to be provided in the event of death shall be as follows: Grocery allowance, Provision of Standard funeral services, Transport for mourners, Chapel services, Funeral cover for a maximum of 5 children ceases upon attainment of age 21 after which they are charged the dependent rate.
          </p>
          <p>
            <span className="font-bold underline">2. Waiting period:</span> No services will be provided and benefits will be paid if death occurs within the waiting period save for the accidental death. (a) 3 months from the date of commencement of this policy. (b) 1 month from the date of reinstatement from a lapse state within 3 months of lapse. (c) 3 months from the date of reinstatement from a lapse state between 3 to 6 months of lapse. (d) 3 months from the date of inclusion of a new member for that particular member.
          </p>
          <p>
            <span className="font-bold underline">3. Accidental death:</span> shall mean death, during the currency of this policy, caused by Road-Traffic Accidents ONLY.
          </p>
          <p>
            <span className="font-bold underline">4. Claim intimation:</span> Upon death of a covered member, a properly completed claimant's certificate together with proof of death including but not limited to the following must be forwarded to the company with 3 months of death: Original burial order or death certificate, Original police report (in the case of accidental death).
          </p>
          <p>
            <span className="font-bold underline">5. Policy exclusions:</span> This policy excludes all claims arising: (a) As a consequence of war, invasion, act of foreign enemy, hostilities or war like operations (whether war has been declared or not), mutiny siege, riot civil war commotion, rebellion, instructions and conspiracy. (b) As a result of suicide, whether sane or Insane, during the first 24 (twenty-four), calendar months from the date of commencement or reinstatement of this policy.
          </p>
          <p>
            <span className="font-bold underline">6. Premiums:</span> Premiums are payable in advance on or before the first day of each calendar month. A grace period of 7 days is allowed for payment of premiums.
          </p>
          <p>
            <span className="font-bold underline">7. Misstatement of Age:</span> If the age of the life assured has been misstated, the company may adjust the benefits or premiums to those which would have been payable had the correct age been stated.
          </p>
          <p>
            <span className="font-bold underline">8. Lapse:</span> In the event of non-payment of premiums within the grace period at any time during the currency of this policy, the policy shall lapse all premiums paid shall be forfeited to the company and all benefits will be lost.
          </p>
          <p>
            <span className="font-bold underline">9. Reinstatement:</span> Should this policy lapse, It may be reinstated on written request, on such terms as may be fixed by the company from time to time. Such reinstatement shall be allowable within 12 (twelve) months from the date of lapse.
          </p>
          <p>
            <span className="font-bold underline">10. Voluntary cancellation policy:</span> Voluntary cancellation of this policy is a breach of contract. All premiums paid shall be forfeited to the company. A voluntarily cancelled policy cannot be reinstated.
          </p>
          <p>
            <span className="font-bold underline">11. Payments:</span> All payments to and by the company shall be made at any ROYALTY FUNERAL SERVICES office or representative in the legal tender and may be reviewed in line with the cost of service provision at the discretion of the company from time to time.
          </p>
          <p>
            <span className="font-bold underline">12. Waiver and amendment:</span> No variation, amendment, change or waiver of the terms and conditions of this policy in a manner whatsoever shall be binding on the company unless reduced to writing under the signature of a duly authorized officer to the company.
          </p>
          <p>
            <span className="font-bold underline">13. Riders:</span> Payment for Policy riders should be included in the monthly premium. Riders only cover the Principal member (Policy-holder) and their spouses where applicable.
          </p>
        </div>
      </PageContainer>
    </div>
  );
};

export const PaymentReceipt = ({ client, policy, payment }: { client: Client; policy: Policy; payment: Payment }) => {
  return (
    <div className="max-w-xl mx-auto bg-white p-2">
      <div className="p-2 md:p-4">
        <div className="flex justify-between items-start mb-10">
          <div className="space-y-1">
            <img src="/images/logo.png" alt="Royalty" className="h-12 object-contain mb-2" />
          </div>
          <div className="text-right text-[10px] text-gray-500 space-y-0.5">
            <p className="font-bold text-gray-900">CONTACT US</p>
            <p>+263 71 787 4750</p>
            <p>sales@royaltyfuneral.com</p>
            <p>www.royaltyfuneral.co.zw</p>
          </div>
        </div>

        <div className="bg-gray-50 border-y border-gray-100 -mx-4 md:-mx-6 py-3 mb-6 print:hidden">
          <h1 className="text-center text-lg font-black tracking-[0.3em] text-gray-900 uppercase">PAYMENT RECEIPT</h1>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Receipt Number</p>
            <p className="text-xs font-black text-[#1e3a8a]">#{payment.receiptNumber || 'N/A'}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Date Issued</p>
            <p className="text-lg font-bold text-gray-900">
              {(() => {
                try {
                  const d = new Date(payment.date);
                  if (isNaN(d.getTime())) return new Date().toLocaleDateString('en-ZW', { day: '2-digit', month: 'long', year: 'numeric' });
                  return d.toLocaleDateString('en-ZW', { day: '2-digit', month: 'long', year: 'numeric' });
                } catch (e) {
                  return new Date().toLocaleDateString('en-ZW', { day: '2-digit', month: 'long', year: 'numeric' });
                }
              })()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 mb-10">
          <div className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100">
            <h3 className="text-[10px] font-bold text-[#1e3a8a] uppercase tracking-widest mb-4">Payer Details</h3>
            <div className="space-y-2 text-sm">
              <p className="font-bold text-gray-900">{client.title} {client.firstName} {client.lastName}</p>
              <p className="text-gray-500">{client.phone}</p>
              <p className="text-gray-400 text-xs">ID: {client.idNumber}</p>
            </div>
          </div>
          <div className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100">
            <h3 className="text-[10px] font-bold text-[#1e3a8a] uppercase tracking-widest mb-4">Policy Details</h3>
            <div className="space-y-2 text-sm">
              <p className="font-bold text-gray-900">{policy.policyNumber}</p>
              <p className="text-gray-500">Royalty {policy.planType} – {policy.policyType}</p>
              <p className="text-gray-400 text-xs">Principal: {client.lastName}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 overflow-hidden mb-10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-600 font-bold text-[10px] uppercase tracking-widest">
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-center">Months Covered</th>
                <th className="p-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-4">
                  <p className="font-bold text-gray-900">Insurance Premium Payment</p>
                  <p className="text-xs text-gray-500">Policy: {policy.policyNumber}</p>
                </td>
                <td className="p-4 text-center font-medium text-gray-700">{payment.monthsCovered || '1 Month'}</td>
                <td className="p-4 text-right font-bold text-gray-900">${payment.amount.toFixed(2)}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-[#1e3a8a]/5 text-[#1e3a8a] font-black">
                <td colSpan={2} className="p-4 text-right uppercase tracking-widest text-xs">Total Paid</td>
                <td className="p-4 text-right text-lg">${payment.amount.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mb-12 p-4 bg-purple-50/30 border-l-4 border-[#1e3a8a] rounded-r-lg italic text-sm text-[#1e3a8a]">
          Amount in words: <span className="font-bold">{amountToWords(payment.amount)}</span>
        </div>

        <div className="grid grid-cols-2 gap-16 pt-8">
          <div className="text-center">
            {client.signatureImageUrl ? (
              <img src={client.signatureImageUrl} alt="Customer Signature" className="h-10 mx-auto object-contain" />
            ) : (
              <div className="border-b border-gray-300 h-10 mb-2"></div>
            )}
            <p className="text-[10px] uppercase font-bold text-gray-400">Customer Signature</p>
          </div>
          <div className="text-center">
            {payment.signatureImageUrl ? (
              <img src={payment.signatureImageUrl} alt="Company Officer Signature" className="h-10 mx-auto object-contain" />
            ) : (
              <div className="border-b border-gray-300 h-10 mb-2"></div>
            )}
            <p className="text-[10px] uppercase font-bold text-gray-400">Company Officer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ClaimDocument = ({ client, policy, claim, adminSignature }: { client: Client; policy: Policy; claim: Claim; adminSignature?: string }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-2 font-sans text-gray-900">
      <div className="text-center mb-6">
        <img src="/images/logo.png" alt="Royalty" className="h-14 mx-auto mb-3" />
        <h1 className="text-xl font-black uppercase tracking-widest text-[#1e3a8a]">Declaration of Death / Claim</h1>
        <p className="text-gray-500 font-bold tracking-widest text-xs mt-1">DOC #: CLM-{policy.policyNumber.slice(-5)}-{new Date().getTime().toString().slice(-4)}</p>
        <p className="text-[#1e3a8a] font-black uppercase text-sm mt-2">Policy Type: {policy.policyType}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8 print:break-inside-avoid">
        {/* Card 1: Declarant */}
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
          <div className="flex items-center gap-2 mb-4 text-[#1e3a8a]">
            <User size={18} />
            <h3 className="font-bold uppercase text-xs tracking-widest">Principal Member / Declarant</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-500">Name:</span>
              <span className="font-bold">{client.firstName} {client.lastName}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-500">ID Number:</span>
              <span className="font-medium">{client.idNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Phone:</span>
              <span className="font-medium">{client.phone}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Deceased */}
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
          <div className="flex items-center gap-2 mb-4 text-[#1e3a8a]">
            <User size={18} />
            <h3 className="font-bold uppercase text-xs tracking-widest">Deceased Details</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-500">Name:</span>
              <span className="font-bold">{claim.deceasedName || '—'}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-500">Date of Death:</span>
              <span className="font-medium">{claim.dateOfDeath || '—'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Burial Place:</span>
              <span className="font-medium">{claim.burialPlace || '—'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Services */}
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-12 print:break-inside-avoid">
        <div className="flex items-center gap-2 mb-6 text-[#1e3a8a]">
          <Calendar size={18} />
          <h3 className="font-bold uppercase text-xs tracking-widest">Services Provided</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
          {[
            'Mortuary Services', 'Standard Casket', 'Hearse Service', 
            'Body Removal', 'Washing & Dressing', 'Body Preservation',
            'Gravesite Equipment', 'Chairs & Tents', 'Grocery Hamper',
            'Airtime Allowance', 'Mourner Transport'
          ].map((service, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <CheckCircle2 size={14} className="text-[#1e3a8a]" />
              <span className="text-gray-700">{service}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-8 border-2 border-[#1e3a8a]/20 rounded-3xl italic text-sm text-gray-600 mb-12 leading-relaxed">
        "I hereby declare that the information provided above is true and correct to the best of my knowledge. I understand that any false declaration may result in the forfeiture of benefits."
      </div>

      <div className="grid grid-cols-2 gap-16 print:break-inside-avoid">
        <div className="space-y-6">
          <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-gray-400 border-b pb-1">Submitted By</h4>
          <div className="space-y-4 pt-4">
            {client.signatureImageUrl ? (
              <img src={client.signatureImageUrl} alt="Declarant Signature" className="h-12 object-contain" />
            ) : (
              <div className="border-b border-gray-300 w-full h-12 flex items-end px-2 text-xs font-serif italic text-gray-400">Signature</div>
            )}
            <p className="text-xs font-bold pt-2">Date: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
        <div className="space-y-6">
          <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-gray-400 border-b pb-1">Verified By (Admin)</h4>
          <div className="space-y-4 pt-4">
            {adminSignature || policy.signatureImageUrl ? (
              <img src={adminSignature || policy.signatureImageUrl} alt="Admin Signature" className="h-12 object-contain" />
            ) : (
              <div className="border-b border-gray-300 w-full h-12"></div>
            )}
            <p className="text-xs font-bold pt-2">Date: ________________________</p>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
        Official Document · Royalty Funeral Services Zimbabwe
      </div>
    </div>
  );
};
