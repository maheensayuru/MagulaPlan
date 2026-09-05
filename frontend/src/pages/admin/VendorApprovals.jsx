import { useState } from 'react'
import { FaCheck, FaTimes, FaClipboardCheck, FaMapMarkerAlt, FaTrash } from 'react-icons/fa'
import EmptyState from '../../components/ui/EmptyState'
import { SkeletonCard } from '../../components/ui/Skeleton'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import { useToast } from '../../context/ToastContext'
import { adminApi } from '../../services/api'
import { useAsyncData } from '../../lib/useAsyncData'

export default function VendorApprovals() {
  const { data: vendors = [], setData: setVendors, loading } = useAsyncData(
    async () => {
      const data = await adminApi.pendingVendors()
      return Array.isArray(data) ? data : []
    },
    { initialData: [] },
  )
  const [rejecting, setRejecting] = useState(null)
  const [deletingVendor, setDeletingVendor] = useState(null)
  const [busyId, setBusyId] = useState(null)
  const { showToast } = useToast()


  const handleApprove = async (vendor) => {
    const id = vendor.vendorId ?? vendor.id
    setBusyId(id)
    try {
      await adminApi.approveVendor(id)
      showToast(`${vendor.businessName} approved`, 'success')
      setVendors((list) => list.filter((v) => (v.vendorId ?? v.id) !== id))
    } catch (err) {
      showToast(err.message || 'Could not approve yet: admin service is not connected', 'error')
    } finally {
      setBusyId(null)
    }
  }

  const handleReject = async () => {
    if (!rejecting) return
    const id = rejecting.vendorId ?? rejecting.id
    setBusyId(id)
    try {
      await adminApi.rejectVendor(id)
      showToast(`${rejecting.businessName} rejected`, 'success')
      setVendors((list) => list.filter((v) => (v.vendorId ?? v.id) !== id))
      setRejecting(null)
    } catch (err) {
      showToast(err.message || 'Could not reject yet: admin service is not connected', 'error')
    } finally {
      setBusyId(null)
    }
  }

  const handleDelete = async () => {
    if (!deletingVendor) return
    const id = deletingVendor.vendorId ?? deletingVendor.id
    setBusyId(id)
    try {
      await adminApi.deleteVendor(id)
      showToast(`${deletingVendor.businessName} deleted successfully`, 'success')
      setVendors((list) => list.filter((v) => (v.vendorId ?? v.id) !== id))
      setDeletingVendor(null)
    } catch (err) {
      showToast(err.message || 'Could not delete vendor', 'error')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-medium text-charcoal">Vendor Approvals</h1>
        <p className="text-charcoal/50 text-sm mt-1">Review new vendor listings before they go live in the directory.</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : vendors.length === 0 ? (
        <EmptyState
          icon={FaClipboardCheck}
          title="No pending vendors"
          subtitle="New vendor listings awaiting approval will show up here."
        />
      ) : (
        <ul className="space-y-3">
          {vendors.map((vendor) => {
            const id = vendor.vendorId ?? vendor.id
            return (
              <li key={id} className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-charcoal">{vendor.businessName}</p>
                  <p className="text-sm text-charcoal/50 mt-0.5">
                    {vendor.categoryName}
                    {vendor.districtLocation && (
                      <span className="inline-flex items-center gap-1 ml-2">
                        <FaMapMarkerAlt size={11} /> {vendor.districtLocation}
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleApprove(vendor)}
                    disabled={busyId === id}
                    className="btn-primary text-xs px-4 py-2.5"
                  >
                    <FaCheck size={11} /> Approve
                  </button>
                  <button
                    onClick={() => setRejecting(vendor)}
                    disabled={busyId === id}
                    className="btn-outline text-xs px-4 py-2.5 hover:border-red-400 hover:text-red-500"
                  >
                    <FaTimes size={11} /> Reject
                  </button>
                  <button
                    onClick={() => setDeletingVendor(vendor)}
                    disabled={busyId === id}
                    className="btn-outline text-xs px-3 py-2.5 text-red-600 hover:bg-red-50 hover:border-red-300"
                    title="Delete Vendor"
                  >
                    <FaTrash size={11} /> Delete
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}

      <ConfirmDialog
        open={!!rejecting}
        onClose={() => setRejecting(null)}
        onConfirm={handleReject}
        title="Reject vendor"
        message={`Reject "${rejecting?.businessName}"? They won't be listed in the directory.`}
        confirmLabel="Reject"
        loading={busyId === (rejecting?.vendorId ?? rejecting?.id)}
      />

      <ConfirmDialog
        open={!!deletingVendor}
        onClose={() => setDeletingVendor(null)}
        onConfirm={handleDelete}
        title="Delete Vendor Listing"
        message={`Permanently delete "${deletingVendor?.businessName}"? This will remove their business listing from MagulaPlan.`}
        confirmLabel="Delete"
        loading={busyId === (deletingVendor?.vendorId ?? deletingVendor?.id)}
      />
    </div>
  )
}
