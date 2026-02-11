import { useEffect } from 'react';
import TnCBG from '../assets/TnCBG.png';

const STC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white font-lato">
            {/* Hero Section - Matching Service Page Sizing */}
            <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden bg-white">
                <div
                    className="absolute top-2 left-[10px] right-[10px] bottom-0 bg-cover bg-center flex items-center justify-center flex-col px-4"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255, 240, 230, 0.8), rgba(255, 240, 230, 0.8)), url(${TnCBG})`,
                    }}
                >
                    <h1 className="text-[30px] md:text-5xl font-playfair font-bold text-[#000040] italic drop-shadow-sm text-center">
                        Standard Terms & Conditions
                    </h1>
                    <p className="text-[#000040] font-lato mt-4 text-center uppercase tracking-wider font-bold text-sm md:text-base">
                        (APPLICABLE WEF 1st April 2025)
                    </p>
                </div>
            </div>

            {/* Content Section - Full Width with 60px margins */}
            <div className="px-[15px] md:px-[60px] py-16 md:py-24">
                <div className="w-full text-gray-800 leading-relaxed space-y-8">
                    <section>
                        <p className="text-base font-medium">
                            These Standard Terms and Conditions (“STC”)
                            constitute a legally binding contract governing all
                            logistics, transportation, freight forwarding, customs
                            clearance and allied services provided by Sealand
                            Logistics Group. By requesting a quotation, issuing
                            shipping instructions, placing a booking,
                            tendering/handing over Goods, permitting loading or
                            dispatch, accepting delivery, making any payment, or
                            otherwise availing any Services (in whole or in part),
                            the Customer acknowledges and agrees that these
                            STC shall apply to and govern the relevant transaction
                            and form an integral part of the contractual
                            arrangement between the parties.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="!text-[18px] font-bold uppercase">1. INTRODUCTION</h2>
                        <p>
                            Sealand Logistics Group is engaged in providing
                            domestic pan-India transportation and international
                            freight forwarding and customs-related services.
                            These STC establish the complete framework of
                            rights, obligations, limitations, exclusions, and
                            remedies applicable between the Company and the
                            Customer.
                        </p>
                    </section>

                    <section className="space-y-6">
                        <h2 className="!text-[18px] font-bold uppercase">2. DEFINITIONS & INTERPRETATION</h2>
                        <div className="space-y-4">
                            <h3 className="font-bold">2.1 Definitions</h3>
                            <p>In these Standard Terms & Conditions (“STC”), unless the context otherwise requires, the following words and expressions shall have the meanings set out below:</p>
                            <div className="space-y-4 pl-4">
                                <p><strong>2.1.1 “Sealand Logistics Group” / “Company”</strong> means collectively and individually:<br />(a) Sealand Logistics India Services Pvt. Ltd.; and<br />(b) Sealand Logistics and Shipping Services Pvt. Ltd.,<br />including their directors, officers, employees, representatives, agents, contractors, subcontractors, carriers, customs brokers, associates, group entities, successors and permitted assigns.</p>
                                <p><strong>2.1.2 “Customer”</strong> means any person/entity who requests, books, confirms, pays for, benefits from, instructs, or has any interest in the Services and includes (without limitation) the Consignor, Consignee, importer, exporter, owner of the Goods, principal, shipper, receiver, CHA client, any freight forwarding/logistics company and any third party claiming through or under them.<br />The Customer shall be jointly and severally liable for all obligations under these STC.</p>
                                <p><strong>2.1.3 “Consignor”</strong> means the person/entity tendering or handing over the Goods for transportation/handling and/or shown as “consignor/shipper” on any document.</p>
                                <p><strong>2.1.4 “Consignee”</strong> means the person/entity entitled to receive the Goods and/or shown as “consignee” on any document.</p>
                                <p><strong>2.1.5 “Goods / Consignment”</strong> means all cargo, packages, parcels, pallets, containers, machinery, equipment, materials, documents and items (including any part thereof) tendered for carriage/handling/storage, including empty containers (where applicable).</p>
                                <p><strong>2.1.6 “Services”</strong> means all logistics, transportation, freight forwarding, customs clearance and allied services provided/arranged by the Company including (without limitation) domestic road transport (FTL/LTL), ODC/OOG/project movement, container movement, international ocean freight forwarding, booking of vessel space, documentation, coordination, cargo handling, customs clearance (import/export), warehousing/temporary storage, and any ancillary support.</p>
                                <p><strong>2.1.7 “Booking / Order / Work Order / Shipping Instructions”</strong> means any request, instruction, booking confirmation, work order, tender, email/WhatsApp message, portal submission, rate confirmation, PO reference or similar communication issued by or on behalf of the Customer to avail the Services.</p>
                                <p><strong>2.1.8 “Delivery Point”</strong> means the place where delivery is to be tendered as per the Customer’s instructions, and includes any alternate point selected due to operational constraints, failed delivery, statutory action, Force Majeure, safety or Customer request.</p>
                                <p><strong>2.1.9 “Pickup Point”</strong> means the location from where the Goods are to be collected/loaded as per Customer’s instructions.</p>
                                <p><strong>2.1.10 “LR”</strong> means the Lorry Receipt / Consignment Note issued by the Company (including electronic LR) for domestic transportation and includes POD.</p>
                                <p><strong>2.1.11 “POD” (Proof of Delivery)</strong> means any acknowledgement of delivery including signature, stamp, name, OTP, e-POD, email/WhatsApp confirmation, photograph, GPS/time-stamp, gate entry, or any system-generated delivery proof.</p>
                                <p><strong>2.1.12 “BL / Bill of Lading”</strong> includes House BL, Master BL, Sea Waybill, Delivery Order and any transport document issued/arranged by the Company or carriers/service providers.</p>
                                <p><strong>2.1.13 “Carrier / Actual Carrier”</strong> means any third party performing or providing any part of carriage/transport including shipping lines, NVOCC, MTO, road transporter, rail operator, airline, feeder operator, barge operator, or any other transport provider.</p>
                                <p><strong>2.1.14 “Freight”</strong> means charges payable for transportation/forwarding and includes basic freight, ocean freight, inland haulage, local charges, surcharges and any other transport-related charges.</p>
                                <p><strong>2.1.15 “Charges”</strong> means all costs, expenses and amounts payable in connection with Services including (without limitation) duties, taxes, cess, levies, port/terminal charges, THC, demurrage, detention, storage, survey, inspection, penalties, fines, tolls, fuel surcharge, handling and any thirdparty costs.</p>
                                <p><strong>2.1.16 “Third-Party Charges”</strong> means any demurrage, detention, storage, ground rent, penal charges, examination charges, port/terminal charges, CFS/ICD charges or any other charges imposed by carriers, shipping lines, ports, terminals, CFS/ICD, warehouses, authorities or any third party.</p>
                                <p><strong>2.1.17 “Demurrage”</strong> means charges levied by shipping lines/container operators/terminals for retention of containers beyond permitted free time.</p>
                                <p><strong>2.1.18 “Detention”</strong> means charges levied by shipping lines/container operators/transporters for retention of containers/vehicles/equipment beyond permitted free time.</p>
                                <p><strong>2.1.19 “Storage”</strong> means storage of Goods at any warehouse, yard, CFS/ICD, terminal or any other location, whether arranged by the Company or otherwise, and includes all related handling charges.</p>
                                <p><strong>2.1.20 “Documentation”</strong> includes invoices, packing list, e-way bill, shipping bill, bill of entry, COO, licences, permits, MSDS, VGM and all statutory declarations, certificates and approvals.</p>
                                <p><strong>2.1.21 “BOE”</strong> means Bill of Entry filed for import customs clearance.</p>
                                <p><strong>2.1.22 “SB”</strong> means Shipping Bill filed for export customs clearance.</p>
                                <p><strong>2.1.23 “CHA / Customs Broker”</strong> means a customs broker appointed by the Company and/or Customer for filing and processing customs documentation.</p>
                                <p><strong>2.1.24 “VGM”</strong> means Verified Gross Mass under SOLAS requirements.</p>
                                <p><strong>2.1.25 “Dangerous Goods / Hazardous Goods”</strong> means any goods classified as dangerous, hazardous or regulated under applicable law and/or international conventions (including IMDG Code), including chemicals, batteries, flammable items, corrosives, gases and any restricted/prohibited cargo.</p>
                                <p><strong>2.1.26 “ODC / OOG / Project Cargo”</strong> means Over Dimensional Cargo, Out of Gauge cargo, heavy lift cargo and project cargo requiring specialised equipment, permits, route surveys, escorts and/or special handling.</p>
                                <p><strong>2.1.27 “Invoice Value / Declared Value”</strong> means the value declared by the Customer for the Goods (whether for commercial invoice, customs or insurance purposes) and relied upon by the Company for service planning and risk assessment.</p>
                                <p><strong>2.1.28 “Business Day”</strong> means any day other than Sunday or a public holiday at the relevant place of performance.</p>
                                <p><strong>2.1.29 “Applicable Law”</strong> means all laws, rules, regulations, notifications, circulars, guidelines, orders and requirements of any governmental or regulatory authority applicable to the Services and/or the Goods including (without limitation) Indian Customs Act, 1962, GST laws, Motor Vehicles Act, Foreign Trade Policy, DGFT regulations, port/terminal regulations, and any international conventions as applicable.</p>
                                <p><strong>2.1.30 “Force Majeure Event”</strong> means events beyond reasonable control as per Clause 15.</p>
                                <p><strong>2.1.31 “Tariff”</strong> means the Company’s applicable schedule of charges, waiting/detention charges, demurrage/detention pass-throughs and service fees, as amended from time to time.</p>
                                <p><strong>2.1.32 “Writing / Written”</strong> includes written communication by email, WhatsApp, customer portal, electronic signature, system-generated confirmation, scanned copies and any other electronic record capable of being stored and retrieved.</p>
                                <p><strong>2.1.33 “GST”</strong> means Goods and Services Tax as applicable in India.</p>
                                <p><strong>2.1.34 “MSME / MSMED Act”</strong> means Micro, Small and Medium Enterprises Development Act, 2006, where applicable.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-bold">2.2 Interpretation</h3>
                            <div className="space-y-2 pl-4">
                                <p>(a) Headings are for convenience only and shall not affect interpretation.</p>
                                <p>(b) Words importing the singular include the plural and vice versa.</p>
                                <p>(c) “Including” and “without limitation” shall mean “including without limitation”.</p>
                                <p>(d) References to “Clause” mean clauses of these STC.</p>
                                <p>(e) Any reference to a statute or regulation includes amendments, modifications, re-enactments and replacements.</p>
                                <p>(f) In case of conflict between these STC and any document issued by the Customer, these STC shall prevail unless expressly agreed in writing by the Company’s authorised signatory.</p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="!text-[18px] font-bold uppercase">3. APPLICABILITY, PRECEDENCE & ACCEPTANCE</h2>
                        <div className="space-y-4">
                            <p><strong>3.1 Universal Applicability:</strong><br />These STC shall apply to and govern all Services provided by the Company, whether domestic or international, including (without limitation) trucking, freight forwarding, customs clearance, documentation, warehousing, handling, coordination and any allied services, whether provided directly by the Company or through any subcontractor/agent/carrier engaged by the Company.</p>
                            <p><strong>3.2 Exclusive Terms:</strong><br />These STC shall exclusively apply and shall override, supersede and prevail over any and all terms proposed or imposed by the Customer (whether printed, electronic or otherwise), including in purchase orders, vendor onboarding terms, tenders, rate confirmations, shipping instructions, emails, SOPs, portals, delivery challans, invoices, acknowledgements, or any other communication/document, even if the Company has performed Services after receipt of such Customer terms, unless the Company has expressly agreed to such deviation in writing by its authorised signatory. Any contrary or additional terms of the Customer are hereby expressly rejected and shall be null, void and unenforceable.</p>
                            <p><strong>3.3 Deemed & Irrevocable Acceptance:</strong><br />Without prejudice to Clause 3.2 above, the Customer acknowledges and agrees that these STC shall be deemed accepted and shall apply to each transaction without the requirement of a physical signature upon the occurrence of any one or more of the following events: (i) requesting or confirming a quotation/rate, (ii) placing a booking/work order/shipping instruction, (iii) tendering or handing over cargo and/or documents, (iv) permitting pickup/loading/stuffing, (v) issuance, receipt, acceptance and/or use of any LR/BL/SWB/DO/POD or other transport document, (vi) customs filing/processing, (vii) acceptance of delivery (or attempted delivery), (viii) making any payment (full or part), and/or (ix) continuing to avail the Services after receipt of these STC or a link thereto. Such acceptance shall be binding on the Customer and shall also bind the Consignor, Consignee, importer/exporter and owner of the Goods, jointly and severally, to the extent applicable.</p>
                            <p><strong>3.4 Continuing Application / Entire Course of Dealings:</strong><br />These STC shall apply to each shipment/consignment and shall also govern the entire course of dealings between the Company and the Customer, including all repeat shipments, future bookings, revisions, amendments, add-on services and ancillary transactions.</p>
                            <p><strong>3.5 Updates / Amendments:</strong><br />The Company may revise, modify or update these STC from time to time. The latest version of the STC shall be made available on the Company’s website and/or shared electronically upon request. Any revised STC shall apply prospectively to all future quotations, bookings and Services requested or availed after the effective date of such revision, and shall be deemed accepted by the Customer upon any subsequent booking/request and/or continuation of Services after receipt of, or access to, the updated STC.</p>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="!text-[18px] font-bold uppercase">4. COMPANY STATUS</h2>
                        <div className="space-y-4">
                            <p><strong>4.1</strong> In international freight forwarding and customs-related services, the Company acts as a freight forwarder / logistics service provider / agent arranging carriage and clearance through third parties unless expressly agreed otherwise in writing.</p>
                            <p><strong>4.2 The Company may act as:</strong><br />(a) carrier (for domestic trucking), and/or<br />(b) forwarding agent, and/or<br />(c) customs service facilitator, and/or<br />(d) multimodal operator (where applicable and expressly agreed).</p>
                            <p><strong>4.3</strong> Customer acknowledges that third-party carriers, shipping lines, ports, terminals, CFS/ICD, warehouses and authorities may impose their own terms and conditions, which Customer agrees to be bound by.</p>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="!text-[18px] font-bold uppercase">5. SERVICES OFFERED</h2>
                        <div className="space-y-4">
                            <p><strong>5.1 Domestic Services include:</strong> FTL, LTL, general cargo, container movement, ODC/OOG/project cargo, temperature-controlled transport (if agreed), and allied services.</p>
                            <p><strong>5.2 International Services include:</strong> ocean freight forwarding (import/export), general cargo, container movement, ODC/OOG/project cargo, temperature-controlled transport (if agreed), booking space, documentation, coordination of loading/unloading, cargo handling and customs clearance support.</p>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="!text-[18px] font-bold uppercase">6. CUSTOMER OBLIGATIONS, WARRANTIES & UNDERTAKINGS</h2>
                        <p>The Customer represents, warrants, undertakes and agrees (for itself and on behalf of the Consignor, Consignee, importer/exporter and Owner of the Goods, jointly and severally) that:</p>
                        <div className="space-y-4 pl-4">
                            <p><strong>6.1 Authority / Capacity to Contract</strong><br />The Customer warrants that it is either the Owner of the Goods or the duly authorised agent of the Owner, Consignor and/or Consignee, and that it has full authority to accept and be bound by these STC not only for itself but also as agent for and on behalf of the Owner and all parties interested in the Goods.</p>
                            <p><strong>6.2 Correct Information / Lawful Instructions</strong><br />The Customer (and any person acting on its behalf) shall provide the Company with lawful, sufficient, complete and executable instructions, along with all necessary information, declarations and documentation required for performance of the Services, including without limitation:<br />
                                (a) description of Goods, marks, numbers, quantity, weight, dimensions, value and nature;<br />
                                (b) HS classification/HSN, origin details, handling requirements and regulatory requirements;<br />
                                (c) licences, permits, authorisations, certificates, invoices, packing lists, e-way bills, shipping bills, BOE, COO, MSDS, VGM and any other statutory documents; and<br />
                                (d) any special storage/transport conditions including temperature/humidity/security.<br />
                                The Customer guarantees the correctness, completeness and accuracy of all such information and documentation and shall be solely responsible for any consequences arising from incorrect/incomplete declarations or documents.</p>
                            <p><strong>6.3 Packing, Labelling & Suitability</strong><br />The Customer warrants that the Goods are properly packed, strapped, palletised, sealed, labelled, addressed and prepared in a roadworthy/airworthy/seaworthy condition (as applicable), fit for normal handling and transportation, except where the Company has expressly agreed in writing to undertake packing/labelling responsibility.</p>
                            <p><strong>6.4 Compliance with Applicable Law</strong><br />The Customer warrants that it shall comply with all Applicable Law, including those applicable to the Goods, documentation, import/export, taxation, customs, safety, and transportation, and shall conduct its business in an ethical and lawful manner at all times.</p>
                            <p><strong>6.5 Special Handling / Temperature Controlled / ODC</strong><br />Unless expressly agreed in writing, the Company shall not be obliged to provide any special handling measures such as temperature control, high-security transport, ODC escorts, route surveys, special permits, cranes, heavy-lift handling, or any other special requirement.<br />Where the Company agrees to such measures, the Customer shall bear all related costs and shall strictly comply with all special instructions.</p>
                            <p><strong>6.6 Customs, Classification & Valuation</strong><br />The Customer is solely responsible for correct HS classification, valuation, duty structure, exemptions, licences and regulatory compliance under applicable customs and allied laws. The Company shall not be liable for any customs query, objection, assessment, examination, detention, confiscation, fine, penalty or delay, howsoever arising, including where caused by Customer’s instructions or documentation.</p>
                            <p><strong>6.7 VGM / SOLAS Compliance</strong><br />Where containerised cargo is involved, the Customer shall be solely responsible for providing accurate and timely Verified Gross Mass (VGM) and for ensuring compliance with SOLAS, port/terminal and carrier requirements. Any rejection, delay, rollover, penalty, additional cost or disruption arising from incorrect/late/non-submission of VGM shall be entirely at the Customer’s risk and cost, and the Customer shall indemnify the Company accordingly.</p>
                            <p><strong>6.8 GVW / Overloading & Safe Loading</strong><br />The Customer shall ensure lawful GVW, axle load compliance, safe loading and proper lashing as per applicable laws and safety standards. Any penalty, detention, unloading, re-handling, damage, accident, delay or regulatory action arising from overloading or unsafe loading shall be solely borne by the Customer, and the Customer shall indemnify the Company for all resulting costs, liabilities and third-party claims.</p>
                            <p><strong>6.9 Consignee Readiness / Access / Unloading</strong><br />The Customer shall ensure that the Delivery Point is accessible and safe for vehicle entry/parking and that the consignee and/or authorised receiving person is available with adequate labour/equipment for unloading and acceptance of delivery. Any delay, waiting, detention, re-attempt, failed delivery, storage, return or diversion arising due to consignee unavailability/refusal or site constraints shall be at the Customer’s sole risk and cost.</p>
                            <p><strong>6.10 Indemnity</strong><br />The Customer shall indemnify, defend and hold harmless the Company (including its directors, officers, employees, agents and subcontractors) from and against any and all losses, liabilities, claims, demands, penalties, fines, damages, detention charges, demurrage, storage, legal costs and expenses arising out of or in connection with any breach of this Clause 6 and/or any act, omission, misdeclaration, non-compliance or negligence attributable to the Customer, Consignor, Consignee or any third party acting on their behalf.</p>
                            <p><strong>6.11 Sanctions, Export Control & Trade Compliance</strong><br />The Customer represents, warrants and undertakes that the Goods, the transaction and all parties involved (including shipper, consignee, notify party and end user) shall comply with all applicable trade control, sanctions and export control laws, including (without limitation) UN/EU/OFAC sanctions and restricted/prohibited/dual-use regulations. The Company may, at its sole discretion, refuse, suspend, hold, cancel or terminate any booking/shipment if the Company reasonably believes that performance may result in a breach of any such laws or compliance requirements. All costs, delays, storage, detention, demurrage and consequences arising therefrom shall be borne solely by the Customer, and the Customer shall indemnify the Company accordingly.</p>
                            <p><strong>6.12 Anti-Bribery / No Facilitation Payments</strong><br />The Customer shall not, directly or indirectly, request, authorise, offer, promise or make any bribe, facilitation payment or illegal gratification in connection with the Services, including towards customs, port, terminal, police or any authority. The Company shall have the right to refuse or suspend Services where any such request or conduct is suspected or occurs. The Customer shall be solely liable for all consequences, penalties and losses arising from any breach of this clause and shall indemnify and hold harmless the Company against the same.</p>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="!text-[18px] font-bold uppercase">7. COMPANY RIGHTS</h2>
                        <div className="space-y-4 pl-4 text-sm md:text-base">
                            <p><strong>7.1 Subcontracting / Delegation</strong><br />The Company shall be entitled, at its sole discretion and without prior notice or consent of the Customer, to subcontract, delegate, assign or arrange performance of any part of the Services through any third-party including carriers, shipping lines, airlines, transporters, customs brokers, CFS/ICD operators, terminals, warehouses, surveyors and agents. The Customer expressly agrees that the Company shall not be liable for any act, omission, delay, default or negligence of such third parties beyond the extent mandated by applicable law, and all third-party terms shall be binding upon the Customer.</p>
                            <p><strong>7.2 Right of Inspection / Opening / Verification</strong><br />The Company shall have the unrestricted right (but not the obligation) to open, unpack, examine, weigh, measure, scan, photograph, sample, inspect and/or verify the Goods, packages or containers at any stage if the Company suspects or reasonably believes misdeclaration, prohibited/restricted cargo, dangerous goods, improper packing, overloading, leakage, contamination, security risk or statutory non-compliance. All costs, charges, delays, damages, penalties, storage, detention and consequences arising from such inspection and/or regulatory action shall be borne solely by the Customer, and the Customer shall indemnify the Company against the same.</p>
                            <p><strong>7.3 Operational Discretion / Deviation / Protective Action</strong><br />Notwithstanding any Customer instruction, the Company shall have full operational discretion to select routes, carriers, mode of transport, equipment, hubs, handling points, storage locations, consolidation/transshipment, and to deviate from or modify instructions where required for safety, compliance, congestion management, weather/road conditions, force majeure, equipment constraints, regulatory requirements, or to protect the Company’s interests. Any such deviation, delay, rerouting, storage, transshipment, split shipment, partial delivery or alternative arrangement shall not constitute breach and shall not give rise to any claim against the Company, and all additional costs shall be payable by the Customer.</p>
                            <p><strong>7.4 Compliance with Authority / Statutory Orders</strong><br />The Company may at any time comply with the orders, instructions, recommendations or requirements of any Authority. The Company’s responsibility and liability in respect of the Goods shall cease upon delivery, disposal, detention or other disposition of the Goods in accordance with such orders or recommendations.</p>
                            <p><strong>7.5 Right to Refuse / Suspend / Cancel</strong><br />The Company shall have the right, at its sole discretion, to refuse, suspend, cancel, withdraw or terminate any booking/shipment or part of the Services where the Company reasonably believes that:<br />
                                (a) the Goods are prohibited/restricted/dangerous or mis declared;<br />
                                (b) the Customer has failed to provide required documents/information;<br />
                                (c) the Customer has defaulted in payment or is a credit risk;<br />
                                (d) performance may expose the Company to legal/compliance/operational/reputational risk; or<br />
                                (e) any Force Majeure / hindrance event affects performance.<br />
                                The Company shall not be liable for any loss, delay or consequence arising therefrom and all related Charges shall remain payable by the Customer.</p>
                            <p><strong>7.6 Consolidation / Transshipment / Storage</strong><br />The Company may consolidate Goods with other goods, trans ship, hub, cross-dock or store the Goods temporarily at any location as part of operational requirements. Such actions shall not constitute breach and shall not give rise to any claim.</p>
                            <p><strong>7.7 KYC / Customer Verification & Right to Refuse</strong><br />The Company may require KYC and customer verification documents including GST registration, IEC, PAN, address proof, bank details, authorised signatory proof and other compliance documents. Failure/refusal/delay by Customer to provide KYC may result in suspension/refusal/holding of shipment without liability, and all resulting costs, detention, demurrage, storage and penalties shall be borne by Customer.</p>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="!text-[18px] font-bold uppercase">8. QUOTATIONS, PRICING & RATE VALIDITY</h2>
                        <div className="space-y-4">
                            <p><strong>8.1 Quotations / Indicative Nature:</strong><br />All quotations/rates are indicative, non-binding and subject to availability of equipment, space, carrier confirmation, route feasibility, regulatory requirements and change in third-party charges.</p>
                            <p><strong>8.2 Validity:</strong><br />Unless otherwise stated, quotations are valid for 15 days from date of issue and may be withdrawn/revised by the Company without notice.</p>
                            <p><strong>8.3 Rate Revision / Surcharges:</strong><br />Rates are subject to revision due to changes in fuel, tolls, taxes, duties, exchange rates, carrier surcharges, peak season, congestion, equipment shortage, war/security/piracy surcharges and other cost increases beyond Company control. Customer shall pay revised charges.</p>
                            <p><strong>8.4 Measurement / Weight Discrepancy:</strong><br />Billing shall be based on actual weight/measurement verified by Company/carrier/terminal/weighbridge/statutory records. Customer shall pay differential charges.</p>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="!text-[18px] font-bold uppercase">9. LOADING, UNLOADING & HANDLING</h2>
                        <div className="space-y-4">
                            <p><strong>9.1 Loading / Unloading Responsibility:</strong><br />Unless expressly agreed otherwise, loading at Pickup Point and unloading at Delivery Point shall be Customer’s responsibility including labour, equipment and safety compliance.</p>
                            <p><strong>9.2 Waiting / Detention Charges:</strong><br />Waiting time beyond free time shall be chargeable as per Tariff and payable by Customer.</p>
                            <p><strong>9.3 Driver Assistance:</strong><br />Any assistance by driver/staff is purely voluntary and at Customer risk; no liability attaches to Company.</p>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="!text-[18px] font-bold uppercase">10. DELIVERY, NON-DELIVERY, STORAGE & DISPOSAL</h2>
                        <div className="space-y-4">
                            <p><strong>10.1 Delivery Completion / POD:</strong><br />Delivery shall be deemed complete upon tender of Goods at Delivery Point and acknowledgement through POD (including electronic proof). POD shall be conclusive evidence of delivery.</p>
                            <p><strong>10.2 Failed Delivery / Consignee Refusal:</strong><br />Where delivery is not taken due to consignee refusal/unavailability/site constraints/document issues, Company may store/return/reroute/reattempt delivery at Customer cost and risk.</p>
                            <p><strong>10.3 Storage:</strong><br />If Goods are not taken delivery within reasonable time, Company may store Goods in open/covered storage at Customer risk/cost. Storage charges shall apply.</p>
                            <p><strong>10.4 Disposal:</strong><br />If Customer fails to provide instructions or clear dues, Company may dispose Goods as permitted under STC and Applicable Law, without liability, and recover dues from proceeds. Customer remains liable for shortfall.</p>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="!text-[18px] font-bold uppercase">11. FREIGHT, CHARGES & PAYMENT TERMS</h2>
                        <div className="space-y-4 ml-4 text-sm md:text-base">
                            <p><strong>11.1 Full Liability for Freight & All Charges</strong><br />The Customer shall pay, without demur, all Freight and Charges in full, including (without limitation) all third-party costs and statutory dues such as duties, taxes, cess, port/terminal charges, THC, CFS/ICD charges, customs charges, demurrage, detention, storage, handling, weighment, surveys, examinations, penalties, fines, tolls, fuel surcharge, war/security surcharges and any other expenses incurred by the Company in connection with the Services. Any such costs paid or incurred by the Company on behalf of the Customer shall be reimbursed immediately upon demand.</p>
                            <p><strong>11.2 Payment Due Date</strong><br />Unless otherwise expressly agreed in writing by the Company’s authorised signatory, all invoices raised by the Company shall be payable within 15 (fifteen) days from the invoice date. Time shall be of the essence in respect of all payment obligations and all payments shall be made in full, in cleared funds, and without delay.</p>
                            <p><strong>11.3 Advance / Security / Credit Control</strong><br />The Company may, at its sole discretion and at any time, require full or partial advance payment, security deposit and/or any other payment assurance, and may refuse pickup, suspend Services, stop in-transit movement, withhold delivery and/or withhold release of documents until receipt of the same, without any liability whatsoever.</p>
                            <p><strong>11.4 No Set-off / No Deduction / No Withholding</strong><br />All payments shall be made strictly without any set-off, deduction, withholding or counterclaim, including on account of any alleged shortage, damage, delay, dispute, claim, debit note, credit note, reconciliation or pending correspondence. Any claim, if permissible, shall be dealt with separately strictly in accordance with these STC and shall not affect the Customer’s obligation to pay in full and on time.</p>
                            <p><strong>11.5 Suspension / Withholding Delivery / Protective Action</strong><br />In the event of any overdue payment, breach of payment terms or apprehended credit risk, the Company shall be entitled (without any liability whatsoever) to suspend or terminate Services, stop movement (including in-transit), withhold delivery, store the Goods, reroute the shipment, and/or dispose of the Goods as permitted under these STC and applicable law, entirely at the Customer’s sole risk and cost. The Customer shall remain liable for all Freight, Charges, demurrage, detention, storage and incidental expenses arising therefrom.</p>
                            <p><strong>11.6 MSME ACT</strong><br />Notwithstanding anything contained in this Clause 11 or elsewhere in these STC, where Sealand Logistics Group (and/or any entity thereof) is registered as a Micro or Small Enterprise (MSME) under the Micro, Small and Medium Enterprises Development Act, 2006 (“MSMED Act”), the Customer expressly acknowledges, agrees and undertakes that:<br />
                                (a) all payments shall be made strictly within the timelines prescribed under the MSMED Act;<br />
                                (b) In accordance with Section 16 of the Micro, Small and Medium Enterprises Development (MSMED) Act, 2006, where payment to an MSME is delayed beyond the agreed credit period (or 45 days maximum under Section 15), the Customer shall be liable to pay compound interest at three times the RBI’s bank rate, calculated on a monthly basis, from the due date until the date of actual payment.<br />
                                (c) such statutory interest shall apply automatically and mandatorily, without any requirement of notice, reminder or demand; and<br />
                                (d) the Company shall be entitled to initiate recovery proceedings including reference to the Micro and Small Enterprises Facilitation Council (MSEFC) and the Customer shall bear all legal, incidental and recovery expenses, without limitation.</p>
                            <p><strong>11.7 Recovery Costs / Legal Expenses</strong><br />The Customer shall bear and reimburse all costs incurred by the Company for recovery of dues including advocate fees, court fees, arbitration costs, collection charges, travel expenses, documentation charges and incidental costs, without limitation, and the same shall be recoverable as a debt due and payable to the Company.</p>
                            <p><strong>11.8 No Withholding Due to Compliance/Authority Action</strong><br />The Customer shall not withhold, delay or dispute payment of Freight/Charges/Third-Party Charges on the ground of any compliance screening, sanctions/KYC verification, customs/authority action, detention, examination, seizure, delay or refusal of clearance, and all such amounts shall remain payable in full as per these STC.</p>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="!text-[18px] font-bold uppercase">12. LIEN</h2>
                        <div className="space-y-4">
                            <p><strong>12.1 Continuing General Lien</strong><br />In the event the Customer fails to clear any outstanding dues within a reasonable period beyond the due date, despite written notices and reminders (as determined by the Company acting reasonably), without prejudice to any other rights and remedies available to the Company, the Company shall have a continuing general lien and right of retention over the Goods and all related documents (including without limitation LR, BL, DO, invoices, POD and customs/release documents) in its possession, custody or control, for any outstanding amounts payable by the Customer to the Company, whether arising in respect of the same consignment or otherwise. In the event the Customer fails to clear any outstanding dues within a reasonable period beyond the due date, the Company may, as a protective measure, withhold pickup, suspend Services, stop intransit movement, and/or withhold delivery and release documents until all outstanding dues are fully realised in cleared funds. The Customer shall remain responsible for any storage, detention, demurrage and incidental costs arising due to such withholding.</p>
                            <p><strong>12.2 Right to Sell / Dispose</strong><br />In the event the Customer fails to clear any outstanding dues within a reasonable period beyond the due date, despite written notices and reminders (as determined by the Company acting reasonably), without prejudice to any other rights and remedies available to the Company, the Company shall be entitled (without liability) to sell, auction or dispose of the Goods and/or documents at the risk and expense of the Customer and apply proceeds towards dues and expenses. Customer shall remain liable for any shortfall.</p>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="!text-[18px] font-bold uppercase">13. INSURANCE</h2>
                        <div className="space-y-4">
                            <p><strong>13.1 Company Not an Insurer:</strong><br />The Company is not an insurer and does not assume liability beyond these STC.</p>
                            <p><strong>13.2 No Cargo Insurance Unless Agreed:</strong><br />Unless the Company expressly agrees in writing (through its authorised signatory) to arrange cargo/transit insurance for a specific shipment, the Company does not and shall not be deemed to arrange, procure, recommend or provide any insurance cover for the Goods, whether in transit, storage or otherwise. The Customer acknowledges that the Company is not an insurer or insurance broker/agent and shall have no obligation to obtain insurance or to advise on the adequacy, scope or terms of any insurance. The Customer shall, at its sole risk and cost, procure and maintain adequate cargo/transit insurance for the Goods. In the absence of such written confirmation from the Company, the Customer shall not hold the Company liable for any uninsured loss, damage, shortage, delay, deterioration, theft or consequential loss, and the Customer hereby waives any claim against the Company arising from non-arrangement or nonavailability of insurance.</p>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="!text-[18px] font-bold uppercase">14. LIMITATION OF LIABILITY, EXCLUSIONS & CLAIMS</h2>
                        <div className="space-y-4 pl-4 text-sm md:text-base">
                            <p><strong>14.1 Liability Limited:</strong><br />The Company’s liability (if any) shall be strictly limited as per these STC and applicable mandatory law.</p>
                            <p><strong>14.2 Domestic Liability Cap:</strong><br />In respect of domestic road transportation, the Company’s maximum aggregate liability (if any) for any loss, damage, shortage, delay, mis delivery or non-delivery of the Goods, whether arising in contract, tort (including negligence), bailment, statute or otherwise, shall be strictly limited to INR 5,000/- (Rupees Five Thousand only) per consignment/LR. This limitation shall apply notwithstanding the nature, value or declared value of the Goods, and the Customer shall not be entitled to circumvent this limitation by alleging any alternate cause of action or by claiming special, consequential or indirect losses</p>
                            <p><strong>14.3 International Forwarding:</strong><br />In respect of international freight forwarding and allied services, the Company acts solely as a freight forwarder and agent for arranging carriage and related services through third-party carriers and service providers, and shall not be deemed to be a carrier, common carrier, contracting carrier or bailee under any circumstances. Accordingly, the Company’s liability (if any) shall not exceed the liability of the actual carrier/service provider and shall be subject at all times to the applicable carrier terms and conditions and any applicable international conventions, and the Company shall be entitled to avail all defences, exclusions and limitations available to such carrier/service provider. This limitation shall apply notwithstanding the nature, value or declared value of the Goods, and the Customer shall not be entitled to circumvent this limitation by alleging any alternate cause of action or by claiming special, consequential or indirect losses</p>
                            <p><strong>14.4 No Indirect / Consequential Loss:</strong><br />Under no circumstances shall the Company be liable for any indirect, consequential, special or punitive losses including loss of profit, business, goodwill, production loss, delay penalties, LD, third-party claims etc.</p>
                            <p><strong>14.5 Delay Not Guaranteed:</strong><br />All transit times are estimates. Company is not liable for delay unless expressly agreed in writing as timeguaranteed.</p>
                            <p><strong>14.6 Exclusions:</strong><br />Company not liable for loss/damage arising from packing defects, inherent vice, customer handling, authority actions, Force Majeure, theft/accident beyond control, etc.</p>
                            <p><strong>14.7 Clean Delivery / Notice:</strong><br />Acceptance of delivery and/or POD/LR acknowledgement without written damage/shortage remarks at the time of delivery shall constitute clean delivery and the Customer shall have no claim thereafter. Any claim for loss/damage/shortage must be notified to the Company in writing within 24 hours of delivery.</p>
                            <p><strong>14.8 Time Bar:</strong><br />No claim shall be entertained by the Company unless written notice of claim, with supporting documents, is received within 7 days of delivery (or the date the Goods ought reasonably to have been delivered in case of non-delivery). Any legal proceedings shall be subject to the applicable limitation period under Indian law and any applicable international convention, and the Company shall be entitled to reject any claim not notified within the above time as contractually not maintainable.</p>
                            <p><strong>14.9 Himalaya Clause:</strong><br />All exclusions, limitations of liability, defences, immunities and time bars contained in these STC shall apply not only to the Company, but also to the Company’s directors, officers, employees, drivers, agents, representatives, contractors, subcontractors, engaged in performance of the Services, each of whom shall be entitled to enforce the same.</p>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="!text-[18px] font-bold uppercase">15. FORCE MAJEURE</h2>
                        <div className="space-y-4 pl-4 text-sm md:text-base">
                            <p><strong>15.1 Definition:</strong><br />“Force Majeure” shall mean any event, circumstance or cause beyond the reasonable control of the Company, whether foreseeable or not, which prevents, hinders, delays or renders commercially impracticable the performance of the Services, including without limitation: natural calamities (flood, cyclone, earthquake), fire, explosion, accident, breakdown of vehicle/equipment, war, hostilities, terrorism, civil commotion, riots, strikes, lockouts, labour disturbances, curfew, embargo, sanctions, pandemic/epidemic, quarantine, government restrictions, change in law/regulation, port/terminal congestion, vessel delay/rollover/blank sailing, carrier schedule changes, shortage of equipment/containers, road closure, traffic restrictions, regulatory checks, customs/port detention or examination, and any act or omission of any governmental authority, carrier, terminal, port, CFS/ICD or third party.</p>
                            <p><strong>15.2 Suspension of Liability:</strong><br />The Company shall not be liable for any loss, damage, delay, non-performance, mis delivery or failure to perform arising directly or indirectly from a Force Majeure event. The Customer expressly agrees that no claim for compensation, penalty, liquidated damages, demurrage/detention, business loss or any consequential loss shall lie against the Company on account of Force Majeure.</p>
                            <p><strong>15.3 Company’s Protective Rights:</strong><br />During a Force Majeure event, the Company shall be entitled, at its sole discretion and without any liability whatsoever, to suspend Services, reroute, trans ship, store the Goods, hold the Goods at any location, arrange alternative mode/carrier, return the Goods, and/or terminate the affected Services. All additional costs, charges, detention, storage, handling, demurrage, port/CFS expenses and incidental expenses arising due to Force Majeure and/or protective action taken by the Company shall be borne solely by the Customer and shall be payable immediately upon demand.</p>
                            <p><strong>15.4 Compliance / Sanctions / Regulatory Holds:</strong><br />Any delay, detention, suspension, non-performance or disruption arising due to sanctions screening, trade compliance checks, KYC verification, regulatory requirements, customs/authority actions, or refusal to process a shipment due to suspected noncompliance shall be treated as a Force Majeure / protective event, and the Company shall not be liable for any resulting loss, delay, cost or consequence. All related Charges, Third-Party Charges, storage, demurrage and detention shall be borne solely by the Customer.</p>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="!text-[18px] font-bold uppercase">16. CUSTOMS CLEARANCE</h2>
                        <div className="space-y-4 text-sm md:text-base">
                            <p><strong>16.1 Customs as Facilitation:</strong><br />Where customs clearance is arranged/facilitated by the Company, the Customer shall execute required authorisations and provide complete documents and correct declarations.</p>
                            <p><strong>16.2 No Liability for Customs Outcome:</strong><br />Company shall not be liable for customs assessments, examinations, queries, delays, detention, confiscation, fines or penalties.</p>
                            <p><strong>16.3 Duties & Taxes:</strong><br />All duties/taxes/charges are Customer responsibility and payable immediately on demand.</p>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="!text-[18px] font-bold uppercase">17. THIRD PARTY SERVICES & PASS-THROUGH COSTS</h2>
                        <div className="space-y-4">
                            <p><strong>17.1 Binding Third Party Terms:</strong><br />Customer acknowledges and agrees to be bound by third-party terms (carriers, ports, terminals, CFS/ICD, warehouses).</p>
                            <p><strong>17.2 Demurrage / Detention / Storage:</strong><br />All demurrage/detention/storage are pass-through and payable by Customer irrespective of disputes.</p>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="!text-[18px] font-bold uppercase">18. INDEMNITY</h2>
                        <div className="space-y-4">
                            <p>The Customer shall defend, indemnify and hold harmless the Company against all liability, loss, damage, delay, costs and expenses arising from or in connection with:<br />
                                (a) Customer’s negligence or wilful misconduct;<br />
                                (b) nature or inherent vice of Goods;<br />
                                (c) duties/taxes/levies imposed by any authority;<br />
                                (d) Company acting on Customer instructions;<br />
                                (e) breach of warranties under Clause 6;<br />
                                (f) any other person relying on Company information provided for Customer only.<br />
                                This indemnity shall be without limitation and shall survive completion/termination.</p>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="!text-[18px] font-bold uppercase">19. TERMINATION / SUSPENSION</h2>
                        <div className="space-y-4">
                            <p><strong>19.1 Right to Suspend / Terminate:</strong><br />The Company shall be entitled, at its sole discretion and without any liability whatsoever, to suspend, withdraw, refuse, cancel and/or terminate the Services (in whole or in part), with immediate effect and without prior notice, in the event of:<br />
                                (a) non-payment or delayed payment of any amount due;<br />
                                (b) breach of any term of these STC;<br />
                                (c) misdeclaration, concealment or incorrect documentation;<br />
                                (d) tendering of prohibited, restricted or hazardous goods without disclosure/approval;<br />
                                (e) repeated disputes, debit notes, set-off attempts or credit risk concerns; or<br />
                                (f) any other event which, in the Company’s reasonable opinion, may expose the Company to legal, financial, operational or reputational risk.</p>
                            <p><strong>19.2 Survival of Payment Obligations / Accrued Charges:</strong><br />Termination or suspension shall not affect the Customer’s obligation to pay all Freight, Charges, third-party costs, demurrage, detention, storage, penalties, interest and recovery/legal expenses accrued up to the date of suspension/termination (and thereafter, where applicable). All such amounts shall become immediately due and payable, and the Company shall be entitled to exercise all rights available under these STC including lien, withholding delivery and recovery proceedings.</p>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="!text-[18px] font-bold uppercase">20. GOVERNING LAW & JURISDICTION</h2>
                        <p>These STC and all transactions, Services, claims and disputes arising out of or in connection herewith shall be governed by and construed in accordance with the laws of India. The parties expressly agree that the courts at Kolkata, West Bengal, India shall have exclusive jurisdiction over all matters arising out of or relating to these STC and/or the Services, to the absolute exclusion of all other courts/fora. The Customer irrevocably submits to such jurisdiction and waives any objection on the grounds of venue, forum non conveniens, territorial jurisdiction, or any similar basis.</p>
                    </section>

                    <section className="space-y-6">
                        <h2 className="!text-[18px] font-bold uppercase">21. DISPUTE RESOLUTION & ARBITRATION</h2>
                        <div className="space-y-4 pl-4 text-sm md:text-base">
                            <p><strong>21.1 Arbitration:</strong><br />Any dispute, controversy or claim arising out of or in connection with these STC and/or the Services, including their interpretation, performance, breach, termination or validity (“Dispute”), shall be referred to and finally resolved by arbitration in accordance with the Arbitration and Conciliation Act, 1996 (as amended).</p>
                            <p><strong>21.2 Arbitrator:</strong><br />The arbitrator will be appointed by mutual consent, or through a neutral body (like a Chamber of Commerce), or that the Company will provide a panel of three names from which the Customer must choose. The seat and venue of arbitration shall be Kolkata, West Bengal, and the language of arbitration shall be English.</p>
                            <p><strong>21.3 Finality:</strong><br />The arbitral award shall be final and binding on the parties.</p>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="!text-[18px] font-bold uppercase">22. JURISDICTION FOR INTERIM RELIEF / ENFORCEMENT</h2>
                        <p>Notwithstanding Clause 22 above, the courts at Kolkata, West Bengal shall have exclusive jurisdiction for granting interim reliefs and for enforcement of any arbitral award, to the exclusion of all other courts/fora.</p>
                    </section>

                    <section className="space-y-6">
                        <h2 className="!text-[18px] font-bold uppercase">23. SEVERABILITY</h2>
                        <p>If any provision of these STC is held to be invalid or unenforceable (in whole or in part) by any court, tribunal or competent authority, such provision shall be deemed severed to the extent of such invalidity or unenforceability, and the remaining provisions shall continue in full force and effect as valid, binding and enforceable. The parties further agree that the invalid/unenforceable provision shall be replaced, to the maximum extent permitted by law, with a valid provision that most closely reflects the original commercial intent and provides maximum enforceability in favour of the Company.</p>
                    </section>

                    <section className="space-y-6">
                        <h2 className="!text-[18px] font-bold uppercase">24. MISCELLANEOUS</h2>
                        <div className="space-y-4 pl-4 text-sm md:text-base">
                            <p><strong>24.1 Entire Agreement / Supersession:</strong><br />These STC constitute the entire agreement between the Company and the Customer in relation to the Services and shall supersede and override all prior or contemporaneous discussions, representations, negotiations, understandings, communications and arrangements, whether oral or written, including emails, messages, quotations, SOPs, purchase orders and tender documents, except to the extent expressly agreed otherwise in writing by the Company’s authorised signatory.</p>
                            <p><strong>24.2 Notices / Deemed Service:</strong><br />Any notice, demand or communication required or permitted to be given under these STC may be served by the Company by registered post/speed post/courier and/or email to the Customer’s last known address/email ID available in the Company’s records. Such notice shall be deemed to have been validly served upon dispatch (in case of email) and upon delivery attempt (in case of physical dispatch), and the Customer waives any objection to mode or proof of service.</p>
                            <p><strong>24.3 Assignment / Transfer of Rights:</strong><br />The Customer shall not assign, transfer, novate or subcontract any of its rights, obligations or liabilities under these STC without the Company’s prior written consent. The Company shall be entitled to assign, transfer or delegate its rights and/or obligations under these STC (in whole or in part) to any of its group entities, affiliates, agents, subcontractors, financiers or successors without requiring any consent from the Customer.</p>
                            <p><strong>24.4 No Waiver / No Estoppel:</strong><br />No failure or delay by the Company in exercising any right, power or remedy under these STC shall operate as a waiver thereof, nor shall any single or partial exercise preclude any further exercise of the same or any other right, power or remedy. Any waiver by the Company shall be valid only if made expressly in writing by the Company’s authorised signatory.</p>
                            <p><strong>24.5 Headings / Interpretation:</strong><br />Clause headings are inserted for convenience only and shall not affect the interpretation, meaning or enforceability of these STC.</p>
                        </div>
                    </section>
                </div>

                <div className="mt-20 pt-10 border-t border-gray-100 text-center">
                    <p className="text-gray-400 text-[10px] md:text-xs">
                        © 2025 Sealand Logistics Group. All Rights Reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default STC;
