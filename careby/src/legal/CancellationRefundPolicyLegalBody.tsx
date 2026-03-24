/**
 * Cancellation & Refund Policy — Careby Solutions Inc.
 * Aligned with Careby_Cancellation_Refund_Policy_V12.pdf (Effective March 12, 2026).
 */
export function CancellationRefundPolicyLegalBody() {
  return (
    <div className="space-y-8 text-sm leading-relaxed text-slate-700">
      <p className="text-xs text-slate-500">
        Careby Solutions Inc. · Version 12.0 · This policy is provided for transparency. Marked confidential in the source
        document; published here for members and prospective clients.
      </p>

      <div className="space-y-4">
        <p>
          Careby is a premium health coordination and diagnostics service. We want every experience to be straightforward —
          including what happens if you need to cancel. This policy is written to be clear and fair. The guiding principle is
          simple: once professional time or clinical resources have been committed to your care, those costs are earned. Refunds
          are available in the specific circumstances described below, and we will always tell you exactly where you stand.
        </p>
      </div>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-midnight">At a Glance</h3>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-[640px] w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="p-3 font-semibold text-midnight">Product</th>
                <th className="p-3 font-semibold text-midnight">Refund Available?</th>
                <th className="p-3 font-semibold text-midnight">Key Condition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="p-3 align-top">Annual Diagnostic Plans</td>
                <td className="p-3 align-top">Yes — limited</td>
                <td className="p-3 align-top">Full refund only if physician requisition has not yet been issued</td>
              </tr>
              <tr>
                <td className="p-3 align-top">Family Health Hub</td>
                <td className="p-3 align-top">Yes — limited</td>
                <td className="p-3 align-top">Full refund only if no requisition has been issued for either senior</td>
              </tr>
              <tr>
                <td className="p-3 align-top">Monthly Plans (Independent Living / Companion)</td>
                <td className="p-3 align-top">No</td>
                <td className="p-3 align-top">
                  30 days written notice cancels future billing; current month non-refundable. Bundled GoToDoctor plans are
                  billed annually upfront and are non-refundable.
                </td>
              </tr>
              <tr>
                <td className="p-3 align-top">Credit Packages</td>
                <td className="p-3 align-top">No</td>
                <td className="p-3 align-top">
                  All sales final. Ontario CPA cooling-off applies within 10 business days if zero credits redeemed.
                </td>
              </tr>
              <tr>
                <td className="p-3 align-top">Imaging Add-Ons</td>
                <td className="p-3 align-top">Conditional</td>
                <td className="p-3 align-top">Third-party rules apply; Careby facilitates refund if cancelled 48+ hrs in advance</td>
              </tr>
              <tr>
                <td className="p-3 align-top">Corporate Wellness</td>
                <td className="p-3 align-top">No</td>
                <td className="p-3 align-top">Non-cancellable for 12-month committed term; full contracted value remains owing</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-midnight">1. Your Rights Under Ontario Law</h3>
        <p>
          The Ontario Consumer Protection Act (CPA) provides a 10-business-day cooling-off period for purchases made online
          or through our app. During this window, you may cancel for any reason and receive a full refund, provided no services
          have been delivered.
        </p>
        <p>
          To exercise this right, email{' '}
          <a href="mailto:support@carebyhealth.com" className="text-primary underline">
            support@carebyhealth.com
          </a>{' '}
          within 10 business days of purchase with the subject line:{' '}
          <em>&quot;Cooling-Off Cancellation — [Your Name] — [Product Name]&quot;</em>
        </p>
        <p>
          After the 10-business-day window, or once any portion of a service has been delivered, refunds are governed by the
          product-specific terms below.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-midnight">2. Annual Diagnostic Plans</h3>
        <p>
          <span className="font-semibold">Applies to:</span> The Essentialist ($399/yr), Longevity Audit ($699/yr), Vitality 60+
          ($999/yr), Careby Infinity ($2,499/yr)
        </p>
        <p>
          Each diagnostic plan covers a complete clinical workflow: client intake review, physician requisition, laboratory
          processing, doctor-reviewed results, and a results consultation.
        </p>
        <h4 className="font-semibold text-midnight">2.1 When Clinical Work Begins</h4>
        <p>
          The clinical workflow begins when a physician requisition is issued — not at the moment of the blood draw. Issuing a
          requisition requires your care coordinator to complete a health intake review, and the physician to assess your
          profile and authorize the appropriate panel. This professional time is committed on your behalf regardless of
          whether the draw subsequently takes place.
        </p>
        <p>For this reason, refund eligibility is determined by requisition status, not draw status.</p>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-[480px] w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="p-3 font-semibold text-midnight">Status at Time of Cancellation Request</th>
                <th className="p-3 font-semibold text-midnight">Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="p-3 align-top">Requisition not yet issued</td>
                <td className="p-3 align-top">Full refund</td>
              </tr>
              <tr>
                <td className="p-3 align-top">Requisition issued — draw not yet completed</td>
                <td className="p-3 align-top">Plan fee non-refundable. No additional fees apply.</td>
              </tr>
              <tr>
                <td className="p-3 align-top">Blood draw completed</td>
                <td className="p-3 align-top">Plan fee non-refundable. Full clinical workflow has been delivered.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Once your blood sample has been submitted to the laboratory, the clinical workflow is irreversible. Lab analysis,
          physician review, and results consultation costs are fully incurred at that point regardless of whether you choose to
          view your results.
        </p>
        <h4 className="font-semibold text-midnight">2.2 Results Consultation</h4>
        <p>
          Once your blood draw has been completed, the results consultation included with your plan must be used within 12
          months of that date. Unused consultations expire and cannot be refunded, credited, or transferred. Careby will send a
          reminder at 10 months to help you schedule before expiry.
        </p>
        <h4 className="font-semibold text-midnight">2.3 Automatic Renewal</h4>
        <p>
          Annual plans renew automatically on your anniversary date. To prevent renewal, notify Careby in writing at least 30
          calendar days before your renewal date. Plans that have already renewed are not eligible for refund. Your renewal date
          is confirmed in your original purchase receipt and member portal.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-midnight">3. Imaging Add-Ons (from $299)</h3>
        <p>
          Imaging services are provided by third-party diagnostic partners. Careby facilitates access but does not directly
          deliver imaging services.
        </p>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-[480px] w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="p-3 font-semibold text-midnight">Timing of Cancellation</th>
                <th className="p-3 font-semibold text-midnight">Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="p-3 align-top">48+ hours before appointment</td>
                <td className="p-3 align-top">
                  Careby will request a refund or credit from the imaging provider on your behalf. The outcome is subject to the
                  provider&apos;s own cancellation policy.
                </td>
              </tr>
              <tr>
                <td className="p-3 align-top">Within 24 hours of appointment</td>
                <td className="p-3 align-top">
                  Subject to the provider&apos;s own cancellation policy. Careby is not liable for third-party cancellation fees.
                </td>
              </tr>
              <tr>
                <td className="p-3 align-top">After appointment attended</td>
                <td className="p-3 align-top">No refund — service fully delivered by the third-party provider</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-midnight">4. Monthly Subscription Plans</h3>
        <p>
          <span className="font-semibold">Applies to:</span> Independent Living ($1,499/month); Companion Starter ($199/month),
          Regular ($329/month), Plus ($549/month)
        </p>
        <p>
          Monthly plans are billed in full at the start of each billing cycle. The fee covers caregiver matching, scheduling,
          coordination, GoToDoctor access, and platform services — all provisioned from the first day of the billing period.
          No refunds are issued for any current or past billing month.
        </p>
        <h4 className="font-semibold text-midnight">4.1 How to Cancel</h4>
        <p>
          Submit a written cancellation request to{' '}
          <a href="mailto:support@carebyhealth.com" className="text-primary underline">
            support@carebyhealth.com
          </a>{' '}
          with the subject line <em>&quot;Cancellation Request — [Your Name] — [Plan Name].&quot;</em> Provide at least 30 calendar
          days&apos; written notice. Cancellation takes effect only upon written acknowledgment from Careby, which we will
          confirm within 2 business days. Billing continues through the end of the confirmed notice period. Phone requests do
          not constitute a valid cancellation.
        </p>
        <h4 className="font-semibold text-midnight">4.2 GoToDoctor Access — Independent Living</h4>
        <p>
          Independent Living includes access to GoToDoctor (Physician Care + Specialist Finder / Wait-time Navigator) as a
          bundled component of the plan. GoToDoctor access is provisioned on the first day of your plan and is committed for a
          12-month term from your signup date, regardless of when you cancel.
        </p>
        <p>
          By enrolling in Independent Living, you acknowledge that the GoToDoctor annual seat fee of $300 is a committed cost
          incurred by Careby on your behalf at the time of signup. This fee is non-refundable under any cancellation scenario.
        </p>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-[520px] w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="p-3 font-semibold text-midnight">Cancellation Scenario</th>
                <th className="p-3 font-semibold text-midnight">GoToDoctor Fee</th>
                <th className="p-3 font-semibold text-midnight">GoToDoctor Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="p-3 align-top">Cancel before any credits used</td>
                <td className="p-3 align-top">$300 non-refundable</td>
                <td className="p-3 align-top">Continues through end of 12-month term from signup date</td>
              </tr>
              <tr>
                <td className="p-3 align-top">Cancel after credits have been redeemed</td>
                <td className="p-3 align-top">$300 non-refundable</td>
                <td className="p-3 align-top">Continues through end of 12-month term from signup date</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          GoToDoctor is a third-party service. Careby facilitates access but is not responsible for platform availability or
          service changes.
        </p>
        <h4 className="font-semibold text-midnight">4.3 Careby Home Credits — Independent Living</h4>
        <p>
          The 10 Careby Home credits included each month are provisioned at the start of each billing cycle. Credits issued in
          the current billing month are non-refundable once the billing cycle has begun. Any credits redeemed prior to
          cancellation are non-refundable. Unused credits from prior billing months that have not expired remain accessible
          through your account until their 2-year expiry date.
        </p>
        <h4 className="font-semibold text-midnight">4.4 Early Termination Fee</h4>
        <p>
          If a caregiver or companion has completed at least one visit and you cancel within the first 90 days, a flat early
          termination fee of $250 applies. This reflects the upfront costs of caregiver onboarding, matching, and scheduling
          coordination incurred before service delivery begins.
        </p>
        <h4 className="font-semibold text-midnight">4.5 Plan Pause</h4>
        <p>
          You may pause your plan for up to 60 consecutive days per 12-month period at no charge, with 14 calendar days&apos;
          notice. Billing pauses and resumes automatically. GoToDoctor access continues uninterrupted during a pause. Pause
          requests beyond 60 days are treated as a cancellation.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-midnight">5. Flexible Credit Packages</h3>
        <p>
          <span className="font-semibold">Applies to:</span> Essential ($900 / 12 credits), Balanced ($2,100 / 30 credits),
          Premium ($4,000 / 60 credits)
        </p>
        <p>
          Credit packages are purchased at a bulk discount and represent pre-purchased access to Careby Home services at a
          reduced rate. All credit package sales are final from the moment of purchase. Credits expire 2 years from the date of
          purchase and cannot be refunded, transferred, or extended after expiry.
        </p>
        <h4 className="font-semibold text-midnight">5.1 Ontario CPA Cooling-Off</h4>
        <p>
          If you have purchased a credit package and have not redeemed any credits, you may cancel within 10 business days of
          purchase for a full refund under the Ontario Consumer Protection Act. After 10 business days, or after any credit has
          been redeemed, all sales are final with no exceptions.
        </p>
        <h4 className="font-semibold text-midnight">5.2 If Careby Discontinues a Service</h4>
        <p>
          If Careby permanently discontinues a service category that renders your credits unusable, Careby will refund the value
          of unused credits at your original per-credit purchase rate. This is the only other circumstance in which a credit
          refund will be issued outside the CPA cooling-off window.
        </p>
        <h4 className="font-semibold text-midnight">5.3 Expiry Reminders</h4>
        <p>
          Careby will send reminder notifications at 18 months and 23 months from your purchase date. Expired credits are
          forfeited and will not be reinstated.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-midnight">6. Family Health Hub ($2,499/year)</h3>
        <p>
          The Family Health Hub is an annual plan that includes 2 blood draws (usable by any 2 members of the covered
          household), GoToDoctor telehealth access for up to 4 members, 4 Careby Home service credits, OneStep gait monitoring,
          and a dedicated care coordinator. The same principle applies: once professional time or clinical resources have been
          committed, the plan fee is non-refundable.
        </p>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-[480px] w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="p-3 font-semibold text-midnight">Status at Time of Cancellation Request</th>
                <th className="p-3 font-semibold text-midnight">Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="p-3 align-top">No requisition issued for any member</td>
                <td className="p-3 align-top">Full refund</td>
              </tr>
              <tr>
                <td className="p-3 align-top">Requisition issued — draw not yet completed</td>
                <td className="p-3 align-top">Plan fee non-refundable. No additional fees apply.</td>
              </tr>
              <tr>
                <td className="p-3 align-top">Any member&apos;s blood draw completed</td>
                <td className="p-3 align-top">Plan fee non-refundable. Full clinical workflow has been delivered.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Upon activation, Careby immediately provisions GoToDoctor access for up to 4 members, OneStep gait monitoring, and
          assigns a dedicated coordinator. These services are live from day one.
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            GoToDoctor telehealth access remains active through the end of the plan year, provided no refund has been issued.
          </li>
          <li>
            The 4 included service credits are governed by Section 5 — all sales final from the moment of purchase. Once any
            credit is redeemed it is non-refundable.
          </li>
          <li>
            To cancel before any requisition has been issued, submit a written request to{' '}
            <a href="mailto:support@carebyhealth.com" className="text-primary underline">
              support@carebyhealth.com
            </a>
            . Refund eligibility is determined by requisition status at the time Careby acknowledges the cancellation in
            writing.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-midnight">7. Corporate Wellness Plans</h3>
        <p>
          <span className="font-semibold">Applies to</span> all Careby Corporate — Workforce Wellness engagements.
        </p>
        <p>
          Corporate Wellness plans are priced on an annual per-seat basis. Pricing reflects a 12-month committed term and is
          not structured for month-to-month use. To ensure that pricing remains commercially sustainable for all clients,
          Corporate Wellness agreements are non-cancellable for the duration of the committed term.
        </p>
        <h4 className="font-semibold text-midnight">7.1 Committed Term</h4>
        <p>
          All Corporate Wellness plans carry a minimum 12-month committed term from the agreement start date. Cancellation
          requests submitted before the end of the committed term will not be accepted. The full contracted value remains owing
          for the duration of the term regardless of employee utilization, headcount changes, or organizational restructuring.
        </p>
        <h4 className="font-semibold text-midnight">7.2 Renewal and Wind-Down</h4>
        <p>
          To prevent automatic renewal, written notice must be provided at least 30 calendar days before the term end date.
          Notice must be submitted to{' '}
          <a href="mailto:support@carebyhealth.com" className="text-primary underline">
            support@carebyhealth.com
          </a>{' '}
          with the subject line <em>&quot;Corporate Cancellation — [Organization Name].&quot;</em> Careby will confirm receipt within 2
          business days.
        </p>
        <h4 className="font-semibold text-midnight">7.3 GoToDoctor Access</h4>
        <p>
          GoToDoctor employee access remains active through the end of the full 12-month committed term, including during any
          wind-down notice period. Access deactivates on the term end date. GoToDoctor is a third-party service — Careby
          facilitates access but is not responsible for platform availability or service changes.
        </p>
        <h4 className="font-semibold text-midnight">7.4 Headcount Adjustments</h4>
        <p>
          Headcount increases are effective immediately and billed on a prorated basis for the remainder of the term.
          Headcount reductions take effect on the next billing cycle and cannot be applied retroactively. Reductions below the
          minimum seat commitment specified in the MSA are not permitted during the committed term.
        </p>
        <h4 className="font-semibold text-midnight">7.5 Governing Terms</h4>
        <p>
          Where an executed Master Services Agreement (MSA) contains terms that supersede this Policy, the MSA governs. In all
          other respects, this Policy applies in full.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-midnight">8. If Something Goes Wrong</h3>
        <p>
          Careby stands behind the quality of every service it delivers. If a service fails for any reason within our control —
          a caregiver no-show, laboratory error, missed appointment, or platform outage — our first priority is to make it
          right:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Reschedule or re-deliver the service at no additional charge at the earliest available time; or</li>
          <li>Issue a service credit equal to the full value of the failed service.</li>
        </ul>
        <p>
          A monetary refund for a service failure will only be issued if Careby is unable to provide a remedy within a
          reasonable timeframe. Remedy requests must be submitted within 30 days of the failure with supporting documentation.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-midnight">9. Your Health Data After Cancellation</h3>
        <p>
          Careby holds coordination-layer data — biomarker trend summaries, care utilization records, gait monitoring outputs,
          and platform activity. Clinical records, laboratory results, and medical files are held by Dr. Jerry Leung&apos;s clinic
          in accordance with PHIPA and are not stored by Careby.
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            You retain access to your Careby coordination records and platform data for 30 calendar days from your confirmed
            cancellation date. To request an export, email{' '}
            <a href="mailto:privacy@carebyhealth.com" className="text-primary underline">
              privacy@carebyhealth.com
            </a>{' '}
            during this window.
          </li>
          <li>
            For access to clinical records and laboratory results, contact Dr. Leung&apos;s clinic directly. Those records are
            governed by the clinic&apos;s own retention and access policies under PHIPA.
          </li>
          <li>
            Requests to delete non-clinical personal information held by Careby (contact details, billing information) may be
            submitted to{' '}
            <a href="mailto:privacy@carebyhealth.com" className="text-primary underline">
              privacy@carebyhealth.com
            </a>
            , subject to applicable legal retention requirements.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-midnight">10. Billing Disputes</h3>
        <p>
          If you believe a charge was made in error, please contact us first. Email{' '}
          <a href="mailto:support@carebyhealth.com" className="text-primary underline">
            support@carebyhealth.com
          </a>{' '}
          and allow us 10 business days to review and respond before initiating a chargeback with your financial institution.
          In most cases, we can resolve concerns directly and quickly.
        </p>
        <p>
          Initiating a chargeback for a charge that is non-refundable under this Policy, without first completing Careby&apos;s
          internal resolution process, constitutes a breach of your Member Agreement and may result in suspension of your
          account, recovery of reversed amounts including processing fees, and permanent termination of membership.
        </p>
        <p>
          This clause does not limit your rights under the Ontario Consumer Protection Act. If you believe Careby has acted in
          violation of applicable law, you retain all rights available to you under Ontario law.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-midnight">11. How to Request a Cancellation or Refund</h3>
        <p>All requests must be submitted in writing. Phone requests do not constitute a valid cancellation or refund request.</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Email{' '}
            <a href="mailto:support@carebyhealth.com" className="text-primary underline">
              support@carebyhealth.com
            </a>
          </li>
          <li>
            Subject line <em>&quot;Cancellation Request — [Your Name] — [Product Name]&quot;</em>
          </li>
          <li>Include: Full name · Email on file · Product or plan · Reason for cancellation</li>
          <li>
            <span className="font-semibold">Acknowledgment:</span> Careby confirms within 2 business days with your effective
            cancellation date.
          </li>
          <li>
            <span className="font-semibold">Refund processing:</span> Eligible refunds processed within 10 business days to your
            original payment method.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-midnight">12. Amendments to This Policy</h3>
        <p>
          Careby reserves the right to amend this Policy at any time with at least 30 calendar days&apos; notice to active
          subscribers by email. Continued use of Careby services after the effective date of an amendment constitutes
          acceptance. Amendments more restrictive than the version in effect at your original purchase date take effect at your
          next renewal, not mid-term.
        </p>
      </section>

      <p className="border-t border-slate-200 pt-6 text-xs text-slate-500">
        © 2026 Careby Solutions Inc. · PHIPA Compliant · North York, Toronto · Version 12.0
      </p>
    </div>
  )
}
